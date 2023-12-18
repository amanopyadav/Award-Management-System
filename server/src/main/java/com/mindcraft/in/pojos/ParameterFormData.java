package com.mindcraft.in.pojos;

public class ParameterFormData {
    private String ordergeneration;
    private String customerconnect;
    private String operationalefficiency;
    private String collectionefficiency;

    
    public ParameterFormData(String ordergeneration, String customerconnect, String operationalefficiency,
            String collectionefficiency) {
        this.ordergeneration = ordergeneration;
        this.customerconnect = customerconnect;
        this.operationalefficiency = operationalefficiency;
        this.collectionefficiency = collectionefficiency;
    }


    public String getOrdergeneration() {
        return ordergeneration;
    }

    public void setOrdergeneration(String ordergeneration) {
        this.ordergeneration = ordergeneration;
    }

    public String getCustomerconnect() {
        return customerconnect;
    }

    public void setCustomerconnect(String customerconnect) {
        this.customerconnect = customerconnect;
    }
    public String getOperationalefficiency() {
        return operationalefficiency;
    }

    public void setOperationalefficiency(String operationalefficiency) {
        this.operationalefficiency = operationalefficiency;
    }

    public String getCollectionefficiency() {
        return collectionefficiency;
    }
    
    public void setCollectionefficiency(String collectionefficiency) {
        this.collectionefficiency = collectionefficiency;
    }

    // Constructors, getters, and setters...
}
