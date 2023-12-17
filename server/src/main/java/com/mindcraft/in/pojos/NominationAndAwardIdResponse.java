package com.mindcraft.in.pojos;

public class NominationAndAwardIdResponse {
    private Long nominationId;
    private Long latestAwardId;

    public NominationAndAwardIdResponse(int nominationId, int latestAwardId) {
    }

    public NominationAndAwardIdResponse(Long nominationId, Long latestAwardId) {
        this.nominationId = nominationId;
        this.latestAwardId = latestAwardId;
    }

    public Long getNominationId() {
        return nominationId;
    }

    public void setNominationId(Long nominationId) {
        this.nominationId = nominationId;
    }

    public Long getLatestAwardId() {
        return latestAwardId;
    }

    public void setLatestAwardId(Long latestAwardId) {
        this.latestAwardId = latestAwardId;
    }
}
