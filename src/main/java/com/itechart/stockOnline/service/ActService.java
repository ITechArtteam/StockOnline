package com.itechart.stockOnline.service;


import com.itechart.stockOnline.model.Act;

import java.util.List;

public interface ActService {
    void delete(Long[] ids);

    void delete(Long id);

    List<Act> getAll();

    Act get(Long id);

    Act save(Act act);

    List<Act> getByCompany(Long id);
}
