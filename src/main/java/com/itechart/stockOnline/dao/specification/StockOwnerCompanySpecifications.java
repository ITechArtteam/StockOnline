package com.itechart.stockOnline.dao.specification;


import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.Address_;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.StockOwnerCompany_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;

public class StockOwnerCompanySpecifications {
    public static Specification<StockOwnerCompany> nameLike(String name) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(StockOwnerCompany_.name)), "%" + name.toLowerCase() + "%");
    }

    public static Specification<StockOwnerCompany> addressLike(String address) {
        return ((root, criteriaQuery, criteriaBuilder) -> {
            Join<StockOwnerCompany, Address> addressJoin = root.join(StockOwnerCompany_.address, JoinType.INNER);

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

    public static Specification<StockOwnerCompany> statusEqual(boolean status) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get(StockOwnerCompany_.isActive), status);
    }
}
