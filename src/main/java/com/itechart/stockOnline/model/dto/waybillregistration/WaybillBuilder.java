package com.itechart.stockOnline.model.dto.waybillregistration;

import com.itechart.stockOnline.model.ProductInWaybill;
import com.itechart.stockOnline.model.Transport;
import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.enums.TransportType;
import com.itechart.stockOnline.service.ClientCompanyService;
import com.itechart.stockOnline.service.DriverService;
import com.itechart.stockOnline.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.Date;
import java.util.HashSet;

@Component
public class WaybillBuilder {

    @Autowired
    private ClientCompanyService clientCompanyService;

    @Autowired
    private UserService userService;

    @Autowired
    private DriverService driverService;

    @Autowired
    private WaybillProductBuilder waybillProductBuilder;

    public Waybill buildFromDto(WaybillRegistrationDto dto) throws ParseException {
        Waybill waybill = new Waybill();

        waybill.setNumber(dto.getNumber());
        waybill.setIssuanceDate(getDateFromIsoString(dto.getIssueDate()));
        if (dto.getSenderId() != null) {
            waybill.setSender(clientCompanyService.getById(dto.getSenderId()));
        } else if (dto.getReceiverId() != null) {
            waybill.setReceiver(clientCompanyService.getById(dto.getReceiverId()));
        }

        Transport transport = new Transport();
        if (dto.getTransportType() == TransportType.CAR) {
            transport.setDriver(driverService.findByPassportNumber(
                    dto.getDriverPassportNumber()));
        }

        waybill.setRegistrationDate(getDateTimeFromString(dto.getRegistrationDatetime()));
        waybill.setDescription(dto.getDescription());
        waybill.setResponsiblePerson(userService.findByLogin(dto.getRegisteredByLogin()));
        waybill.setRegisteredBy(userService.findByLogin(dto.getRegisteredByLogin()));

        HashSet<ProductInWaybill> waybillProducts = new HashSet<>();
        for (WaybillProductDto productDto : dto.getProducts()) {
            ProductInWaybill waybillProduct = waybillProductBuilder.buildFromDto(productDto);
            waybillProduct.setWaybill(waybill);
            waybillProducts.add(waybillProduct);
        }

        waybill.setProductInWaybills(waybillProducts);

        transport.setStorage(waybillProducts.iterator().next().getProduct().getStorage());
        transport.setType(dto.getTransportType());
        transport.setNumber(String.join(", ", dto.getNumbers()));
        waybill.setTransport(transport);
        waybill.setStatus(dto.getStatus());

        return waybill;
    }

    private Date getDateTimeFromString(String dateTimeString) throws ParseException {
        return parseDate(dateTimeString, "dd/MM/yyyy HH:mm");
    }

    private Date getDateFromIsoString(String dateString) throws ParseException {
        DateTimeFormatter timeFormatter = DateTimeFormatter.ISO_DATE_TIME;
        TemporalAccessor accessor = timeFormatter.parse(dateString);

        return Date.from(Instant.from(accessor));
    }

    private Date parseDate(String date, String pattern) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        return format.parse(date);
    }
}
