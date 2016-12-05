package com.itechart.stockOnline.service;

import com.itechart.stockOnline.model.Transport;

public interface TransportService {
    Transport save(Transport transport);
    Transport getByNumber(String number);
}
