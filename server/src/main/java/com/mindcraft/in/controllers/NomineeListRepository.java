package com.mindcraft.in.controllers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mindcraft.in.pojos.NomineeList;

@Repository
public interface NomineeListRepository extends JpaRepository<NomineeList, Long> {

    // Custom query to fetch the latest nomination_id and award_id
    @Query(value = "SELECT nomination_id, award_id FROM nominee_list ORDER BY nomination_id DESC LIMIT 1", nativeQuery = true)
    Object[] findLatestNominationIdAndAwardId();
}

    

