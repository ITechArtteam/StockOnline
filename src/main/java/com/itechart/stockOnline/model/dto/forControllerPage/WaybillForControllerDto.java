package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.ProductInWaybill;
import com.itechart.stockOnline.model.Transport;
import com.itechart.stockOnline.model.User;
import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import java.text.ParseException;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

public class WaybillForControllerDto {

    private String DATE_PATTERN = "dd.MM.yyyy";

    private String number;
    private WaybillStatus status;
    private String registrationDate;
    private TransportForControllerDto transport;
    private Set<ProductInWaybillForControllerDto> productInWaybills;
    private UserForControllerDto registeredBy;

    public WaybillForControllerDto(Waybill waybill) {
        if(waybill != null) {
            this.number = waybill.getNumber();
            this.status = waybill.getStatus();
            this.registrationDate = DateFormatUtils.format(waybill.getRegistrationDate(), DATE_PATTERN);
            Transport transport = waybill.getTransport();
            if (transport != null) {
                this.transport = new TransportForControllerDto(transport);
            }

            Set<ProductInWaybill> productInWaybills = waybill.getProductInWaybills();
            if (productInWaybills != null) {
                this.productInWaybills = productInWaybills.stream()
                        .map(ProductInWaybillForControllerDto::new)
                        .collect(Collectors.toSet());
            }

            User user = waybill.getRegisteredBy();
            if(user != null) {
                this.registeredBy = new UserForControllerDto(user);

            }
        }
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public WaybillStatus getStatus() {
        return status;
    }

    public void setStatus(WaybillStatus status) {
        this.status = status;
    }

    public TransportForControllerDto getTransport() {
        return transport;
    }

    public void setTransport(TransportForControllerDto transport) {
        this.transport = transport;
    }

    public Set<ProductInWaybillForControllerDto> getProductInWaybills() {
        return productInWaybills;
    }

    public void setProductInWaybills(Set<ProductInWaybillForControllerDto> productInWaybills) {
        this.productInWaybills = productInWaybills;
    }

    public UserForControllerDto getRegisteredBy() {
        return registeredBy;
    }

    public void setRegisteredBy(UserForControllerDto registeredBy) {
        this.registeredBy = registeredBy;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }
}
