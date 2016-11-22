package com.itechart.stockOnline.dao.specification;

import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.Address_;
import com.itechart.stockOnline.model.Stock;
import com.itechart.stockOnline.model.Stock_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;

public class StockSpecifications {

    public static Specification<Stock> nameLike(String name) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(Stock_.name)), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Stock> addressLike(String address) {
        return ((root, criteriaQuery, criteriaBuilder) -> {
            Join<Stock, Address> addressJoin = root.join(Stock_.address, JoinType.INNER);

            String delimiter = " ";

            Expression<String> expression = criteriaBuilder.concat(addressJoin.get(Address_.countryName), delimiter);
            expression = criteriaBuilder.concat(expression, addressJoin.get(Address_.cityName));
            expression = criteriaBuilder.concat(expression, delimiter);

            expression = criteriaBuilder.concat(expression, addressJoin.get(Address_.street));
            expression = criteriaBuilder.concat(expression, delimiter);

            expression = criteriaBuilder.concat(expression, addressJoin.get(Address_.room).as(String.class));
            expression = criteriaBuilder.concat(expression, delimiter);

            expression = criteriaBuilder.concat(expression, addressJoin.get(Address_.home).as(String.class));
            expression = criteriaBuilder.concat(expression, delimiter);

            return criteriaBuilder.like(expression, "%" + address + "%");
        });
    }
}
