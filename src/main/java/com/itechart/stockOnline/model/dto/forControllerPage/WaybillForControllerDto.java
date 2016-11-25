package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.Waybill;
import com.itechart.stockOnline.model.enums.WaybillStatus;

import java.util.Set;
import java.util.stream.Collectors;

public class WaybillForControllerDto {
    private Long id;
    private WaybillStatus status;
    private TransportForControllerDto transport;
    private Set<ProductInWaybillForControllerDto> productInWaybills;

    public WaybillForControllerDto(Waybill waybill) {
        if(waybill != null) {
            this.id = waybill.getId();
            this.status = waybill.getStatus();
            if (waybill.getTransport() != null) {
                this.transport = new TransportForControllerDto(waybill.getTransport());
            }
            if (waybill.getProductInWaybills() != null) {
                this.productInWaybills = waybill.getProductInWaybills().stream()
                        .map(ProductInWaybillForControllerDto::new)
                        .collect(Collectors.toSet());
            }
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
