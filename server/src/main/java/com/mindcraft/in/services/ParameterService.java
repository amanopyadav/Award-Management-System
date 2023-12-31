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
    
        System.out.println("Parameter ID: " + parameterIds);
    
        // Iterate over the parameter_ids and update the parameter table
        for (Long parameterId : parameterIds) {
            for (ParameterFormData paramFormData : paramFormDataList) {
                String updateQuery = "UPDATE parameter " +
                        "SET description = :description, rating = :rating " +
                        "WHERE nomination_id = :nominationId AND parameter_id = :parameterId";
    
                Query updateQueryObj = entityManager.createNativeQuery(updateQuery)
                        .setParameter("nominationId", nominationId)
                        .setParameter("parameterId", parameterId);
    
                switch (parameterId.intValue()) {
                    case 1:
                        updateQueryObj.setParameter("description", paramFormData.getExceedingexpectations());
                        updateQueryObj.setParameter("rating", paramFormData.getExceedingexpectationsrating());
                        break;
                    case 2:
                        updateQueryObj.setParameter("description", paramFormData.getProcessoriented());
                        updateQueryObj.setParameter("rating", paramFormData.getProcessorientedrating());
                        break;
                    case 3:
                        updateQueryObj.setParameter("description", paramFormData.getTimemanagement());
                        updateQueryObj.setParameter("rating", paramFormData.getTimemanagementrating());
                        break;
                    case 4:
                        updateQueryObj.setParameter("description", paramFormData.getWorkefficiency());
                        updateQueryObj.setParameter("rating", paramFormData.getWorkefficiencyrating());
                        break;
                    case 5:
                        updateQueryObj.setParameter("description", paramFormData.getPunctuality());
                        updateQueryObj.setParameter("rating", paramFormData.getPunctualityrating());
                        break;
                    case 6:
                        updateQueryObj.setParameter("description", paramFormData.getQuicklearner());
                        updateQueryObj.setParameter("rating", paramFormData.getQuicklearnerrating());
                        break;
                    case 7:
                        updateQueryObj.setParameter("description", paramFormData.getProactiveness());
                        updateQueryObj.setParameter("rating", paramFormData.getProactivenessrating());
                        break;
                    case 8:
                        updateQueryObj.setParameter("description", paramFormData.getCustomerconnect());
                        updateQueryObj.setParameter("rating", paramFormData.getCustomerconnectrating());
                        break;
                    case 9:
                        updateQueryObj.setParameter("description", paramFormData.getOwnership());
                        updateQueryObj.setParameter("rating", paramFormData.getOwnershiprating());
                        break;
                    case 10:
                        updateQueryObj.setParameter("description", paramFormData.getExceedingexpectations());
                        updateQueryObj.setParameter("rating", paramFormData.getExceedingexpectationsrating());
                        break;
                    case 11:
                        updateQueryObj.setParameter("description", paramFormData.getProcessoriented());
                        updateQueryObj.setParameter("rating", paramFormData.getProcessorientedrating());
                        break;
                    case 12:
                        updateQueryObj.setParameter("description", paramFormData.getTimemanagement());
                        updateQueryObj.setParameter("rating", paramFormData.getTimemanagementrating());
                        break;
                    case 13:
                        updateQueryObj.setParameter("description", paramFormData.getWorkefficiency());
                        updateQueryObj.setParameter("rating", paramFormData.getWorkefficiencyrating());
                        break;
                    case 14:
                        updateQueryObj.setParameter("description", paramFormData.getPunctuality());
                        updateQueryObj.setParameter("rating", paramFormData.getPunctualityrating());
                        break;
                    case 15:
                        updateQueryObj.setParameter("description", paramFormData.getTeamplayer());
                        updateQueryObj.setParameter("rating", paramFormData.getTeamplayerrating());
                        break;
                    case 16:
                        updateQueryObj.setParameter("description", paramFormData.getExceedingexpectations());
                        updateQueryObj.setParameter("rating", paramFormData.getExceedingexpectationsrating());
                        break;
                    case 17:
                        updateQueryObj.setParameter("description", paramFormData.getProcessoriented());
                        updateQueryObj.setParameter("rating", paramFormData.getProcessorientedrating());
                        break;
                    case 18:
                        updateQueryObj.setParameter("description", paramFormData.getTimemanagement());
                        updateQueryObj.setParameter("rating", paramFormData.getTimemanagementrating());
                        break;
                    case 19:
                        updateQueryObj.setParameter("description", paramFormData.getWorkefficiency());
                        updateQueryObj.setParameter("rating", paramFormData.getWorkefficiencyrating());
                        break;
                    case 20:
                        updateQueryObj.setParameter("description", paramFormData.getPunctuality());
                        updateQueryObj.setParameter("rating", paramFormData.getPunctualityrating());
                        break;
                    case 21:
                        updateQueryObj.setParameter("description", paramFormData.getQuicklearner());
                        updateQueryObj.setParameter("rating", paramFormData.getQuicklearnerrating());
                        break;
                    case 22:
                        updateQueryObj.setParameter("description", paramFormData.getProactiveness());
                        updateQueryObj.setParameter("rating", paramFormData.getProactivenessrating());
                        break;
                    case 25:
                        updateQueryObj.setParameter("description", paramFormData.getContributiontomindcraftbusiness());
                        updateQueryObj.setParameter("rating", paramFormData.getContributiontomindcraftbusinessrating());
                        break;
                    case 26:
                        updateQueryObj.setParameter("description", paramFormData.getPeopleleadership());
                        updateQueryObj.setParameter("rating", paramFormData.getPeopleleadershiprating());
                        break;
                    case 27:
                        updateQueryObj.setParameter("description", paramFormData.getCustomerrelationshipandsatisfaction());
                        updateQueryObj.setParameter("rating", paramFormData.getCustomerrelationshipandsatisfactionrating());
                        break;
                    case 28:
                        updateQueryObj.setParameter("description", paramFormData.getExcellenceinthecorefunction());
                        updateQueryObj.setParameter("rating", paramFormData.getExcellenceinthecorefunctionrating());
                        break;
                    case 29:
                        updateQueryObj.setParameter("description", paramFormData.getResultorachievementorientations());
                        updateQueryObj.setParameter("rating", paramFormData.getResultorachievementorientationsrating());
                        break;
                    case 30:
                        updateQueryObj.setParameter("description", paramFormData.getOrdergeneration());
                        updateQueryObj.setParameter("rating", paramFormData.getOrdergenerationrating());
                        break;
                    case 31:
                        updateQueryObj.setParameter("description", paramFormData.getCustomerconnect());
                        updateQueryObj.setParameter("rating", paramFormData.getCustomerconnectrating());
                        break;
                    case 32:
                        updateQueryObj.setParameter("description", paramFormData.getOperationalefficiency());
                        updateQueryObj.setParameter("rating", paramFormData.getOperationalefficiencyrating());
                        break;
                    case 33:
                        updateQueryObj.setParameter("description", paramFormData.getCollectionefficiency());
                        updateQueryObj.setParameter("rating", paramFormData.getCollectionefficiencyrating());
                        break;
                    case 34:
                        updateQueryObj.setParameter("description", paramFormData.getExceedingexpectations());
                        updateQueryObj.setParameter("rating", paramFormData.getExceedingexpectationsrating());
                        break;
                    case 35:
                        updateQueryObj.setParameter("description", paramFormData.getQualityandinnovation());
                        updateQueryObj.setParameter("rating", paramFormData.getQualityandinnovationrating());
                        break;
                    case 36:
                        updateQueryObj.setParameter("description", paramFormData.getExcellenceinthecorefunction());
                        updateQueryObj.setParameter("rating", paramFormData.getExcellenceinthecorefunctionrating());
                        break;
                    case 37:
                        updateQueryObj.setParameter("description", paramFormData.getPeopleorientation());
                        updateQueryObj.setParameter("rating", paramFormData.getPeopleorientationrating());
                        break;
                    case 38:
                        updateQueryObj.setParameter("description", paramFormData.getOwnershipandcommitment());
                        updateQueryObj.setParameter("rating", paramFormData.getOwnershipandcommitmentrating());
                        break;
                    case 39:
                        updateQueryObj.setParameter("description", paramFormData.getExceedingexpectations());
                        updateQueryObj.setParameter("rating", paramFormData.getExceedingexpectationsrating());
                        break;
                    case 40:
                        updateQueryObj.setParameter("description", paramFormData.getProcessoriented());
                        updateQueryObj.setParameter("rating", paramFormData.getProcessorientedrating());
                        break;
                    case 41:
                        updateQueryObj.setParameter("description", paramFormData.getTimemanagement());
                        updateQueryObj.setParameter("rating", paramFormData.getTimemanagementrating());
                        break;
                    case 42:
                        updateQueryObj.setParameter("description", paramFormData.getWorkefficiency());
                        updateQueryObj.setParameter("rating", paramFormData.getWorkefficiencyrating());
                        break;
                    case 43:
                        updateQueryObj.setParameter("description", paramFormData.getPunctuality());
                        updateQueryObj.setParameter("rating", paramFormData.getPunctualityrating());
                        break;
                    case 44:
                        updateQueryObj.setParameter("description", paramFormData.getProactiveness());
                        updateQueryObj.setParameter("rating", paramFormData.getProactivenessrating());
                        break;
                    // Add more cases as needed
    
                    default:
                        // Handle unexpected parameterId
                        break;
                }
    
                updateQueryObj.executeUpdate();
            }
        }
    }
    


    public NominationAndAwardIdResponse getNominationIdAndLatestAwardId3(String awardCategory, String awardSubCategory, String awardSubCategory1) {
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



    public NominationAndAwardIdResponse getNominationIdAndLatestAwardId2(String awardCategory, String awardSubCategory) {
        String sqlQuery = "SELECT nomination_id, award_id FROM nominee_list " +
                        "WHERE award_category = ? AND award_sub_category = ? " +
                        "ORDER BY nomination_id DESC LIMIT 1";

        try {
            Map<String, Object> result = jdbcTemplate.queryForMap(sqlQuery, awardCategory, awardSubCategory);
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




    public NominationAndAwardIdResponse getNominationIdAndLatestAwardId1(String awardCategory) {
        String sqlQuery = "SELECT nomination_id, award_id FROM nominee_list " +
                        "WHERE award_category = ? " +
                        "ORDER BY nomination_id DESC LIMIT 1";

        try {
            Map<String, Object> result = jdbcTemplate.queryForMap(sqlQuery, awardCategory);
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

