package com.itechart.stockOnline.model.dto.transfercompany;

import com.itechart.stockOnline.model.TransferCompany;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TransferCompanyDtoBuilder {

    public TransferCompanyDto createDto(TransferCompany company) {
        TransferCompanyDto dto = new TransferCompanyDto();
        dto.setId(company.getId());
        dto.setName(company.getName());

        return dto;
    }

    public List<TransferCompanyDto> createDtoList(List<TransferCompany> companies) {
        List<TransferCompanyDto> dtoList = new ArrayList<>();

        for (TransferCompany company : companies) {
            dtoList.add(createDto(company));
        }

        return dtoList;
    }
}
