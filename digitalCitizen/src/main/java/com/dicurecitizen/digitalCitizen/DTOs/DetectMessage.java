
package com.dicurecitizen.digitalCitizen.DTOs;

import jakarta.validation.constraints.NotBlank;

public class DetectMessage
{

    @NotBlank private String text;
    private Integer top_k;
    private Boolean link;
    private Boolean bank;

    public String getText(){ return text; }
    public void setText(String t){ this.text=t; }
    public Integer getTop_k(){ return top_k; }
    public void setTop_k(Integer k){ this.top_k=k; }
    public Boolean getLink(){ return link; }
    public void setLink(Boolean b){ this.link=b; }
    public Boolean getBank(){ return bank; }
    public void setBank(Boolean b){ this.bank=b; }
}
