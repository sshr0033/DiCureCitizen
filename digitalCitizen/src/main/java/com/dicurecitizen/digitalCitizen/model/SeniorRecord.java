package com.dicurecitizen.digitalCitizen.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "SPAM_COMBINED_CLEAN")
public class SeniorRecord {

    @Id
    @Column(name = "RECORD_ID")
    private Long recordId;

    @Column(name = "STARTOFMONTH")
    private Timestamp startOfMonth;

    @Column(name = "ADDRESS_STATE")
    private String addressState;

    @Column(name = "SCAM___CONTACT_MODE")
    private String scamContactMode;

    @Column(name = "COMPLAINANT_AGE")
    private String complainantAge;

    @Column(name = "COMPLAINANT_GENDER")
    private String complainantGender;

    @Column(name = "CATEGORY_LEVEL_2")
    private String categoryLevel2;

    @Column(name = "CATEGORY_LEVEL_3")
    private String categoryLevel3;

    @Column(name = "AMOUNT_LOST")
    private BigDecimal amountLost;

    @Column(name = "NUMBER_OF_REPORTS")
    private Long numberOfReports;


    public Long getRecordId() {
        return recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    public Timestamp getStartOfMonth() {
        return startOfMonth;
    }

    public void setStartOfMonth(Timestamp startOfMonth) {
        this.startOfMonth = startOfMonth;
    }

    public String getAddressState() {
        return addressState;
    }

    public void setAddressState(String addressState) {
        this.addressState = addressState;
    }

    public String getScamContactMode() {
        return scamContactMode;
    }

    public void setScamContactMode(String scamContactMode) {
        this.scamContactMode = scamContactMode;
    }

    public String getComplainantAge() {
        return complainantAge;
    }

    public void setComplainantAge(String complainantAge) {
        this.complainantAge = complainantAge;
    }

    public String getComplainantGender() {
        return complainantGender;
    }

    public void setComplainantGender(String complainantGender) {
        this.complainantGender = complainantGender;
    }

    public String getCategoryLevel2() {
        return categoryLevel2;
    }

    public void setCategoryLevel2(String categoryLevel2) {
        this.categoryLevel2 = categoryLevel2;
    }

    public String getCategoryLevel3() {
        return categoryLevel3;
    }

    public void setCategoryLevel3(String categoryLevel3) {
        this.categoryLevel3 = categoryLevel3;
    }

    public BigDecimal getAmountLost() {
        return amountLost;
    }

    public void setAmountLost(BigDecimal amountLost) {
        this.amountLost = amountLost;
    }

    public Long getNumberOfReports() {
        return numberOfReports;
    }

    public void setNumberOfReports(Long numberOfReports) {
        this.numberOfReports = numberOfReports;
    }
}
