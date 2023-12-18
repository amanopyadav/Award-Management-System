package com.mindcraft.in.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.pojos.NominationAndAwardIdResponse;
import com.mindcraft.in.pojos.ParameterFormData;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

@Service
public class ParameterService {

    private final JdbcTemplate jdbcTemplate;

    @PersistenceContext
    private EntityManager entityManager;

    public ParameterService(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public void updateParameters(List<ParameterFormData> paramFormDataList, Long nominationId, Long latestAwardId) {
        // Fetch the parameter_ids associated with the latestAwardId
        String parameterIdsQuery = "SELECT parameter_id FROM m_parameter WHERE award_id = :latestAwardId";
        Query parameterIdsQueryObj = entityManager.createNativeQuery(parameterIdsQuery)
                .setParameter("latestAwardId", latestAwardId);

        List<Long> parameterIds = parameterIdsQueryObj.getResultList();

        System.out.println("Parameter ID: "+parameterIds);

        // Iterate over the parameter_ids and update the parameter table
        for (Long parameterId : parameterIds) {
            for (ParameterFormData paramFormData : paramFormDataList) {
                String parameterName = paramFormData.getName();

                // Update the parameter table
                String updateQuery = "UPDATE parameter " +
                        "SET description = :description" +
                        "WHERE nomination_id = :nominationId AND parameter_id = :parameterId";

                Query updateQueryObj = entityManager.createNativeQuery(updateQuery)
                        .setParameter("description", paramFormData.getDescription())
                        .setParameter("nominationId", nominationId)
                        .setParameter("parameterId", parameterId);

                updateQueryObj.executeUpdate();
            }
        }
    }



    public NominationAndAwardIdResponse getNominationIdAndLatestAwardId(String awardCategory, String awardSubCategory, String awardSubCategory1) {
    String sqlQuery = "SELECT nomination_id, award_id FROM nominee_list " +
                      "WHERE award_category = ? AND award_sub_category = ? " +
                      "AND award_sub_category2 = ? ORDER BY nomination_id DESC LIMIT 1";

    try {
        Map<String, Object> result = jdbcTemplate.queryForMap(sqlQuery, awardCategory, awardSubCategory, awardSubCategory1);
        Number nominationId = (Number) result.get("nomination_id");
        Number latestAwardId = (Number) result.get("award_id");

        // Assuming NominationAndAwardIdResponse accepts Long parameters
        return new NominationAndAwardIdResponse(
                nominationId != null ? nominationId.longValue() : 0,
                latestAwardId != null ? latestAwardId.longValue() : 0
        );
    } catch (EmptyResultDataAccessException e) {
        // Handle the case where no records are found
        return new NominationAndAwardIdResponse(0, 0);
    }
}


}

