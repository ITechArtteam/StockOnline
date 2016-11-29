package com.itechart.stockOnline.model.dto.waybillregistration.waybillownercompany;

import com.itechart.stockOnline.model.StockOwnerCompany;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StockOwnerCompanyWaybillDtoBuilder {

    public StockOwnerCompanyWaybillDto buildDto(StockOwnerCompany company) {
        StockOwnerCompanyWaybillDto dto = new StockOwnerCompanyWaybillDto();
        dto.setId(company.getId());
        dto.setName(company.getName());

        return dto;
    }

    public List<StockOwnerCompanyWaybillDto> buildDtoList(List<StockOwnerCompany> companies) {
        List<StockOwnerCompanyWaybillDto> dtoList = new ArrayList<>();

        for (StockOwnerCompany company : companies) {
            dtoList.add(buildDto(company));
        }

        return dtoList;
    }
}
