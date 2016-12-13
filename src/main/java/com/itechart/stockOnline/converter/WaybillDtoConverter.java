package com.itechart.stockOnline.converter;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.dto.WaybillPage;
import com.itechart.stockOnline.model.dto.forControllerPage.WaybillForControllerDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class WaybillDtoConverter {
    public WaybillPage toWaybillPage(Page<Waybill> page) {
        WaybillPage result = new WaybillPage();
        result.setActivePage(page.getNumber() + 1);
        result.setItemsCountPerPage(page.getSize());
        result.setTotalItemsCount(page.getTotalElements());

        List<WaybillForControllerDto> waybills = new ArrayList<>();
        page.forEach((waybill) -> waybills.add(new WaybillForControllerDto(waybill)));

        result.setWaybills(waybills);
        return result;
    }
}
