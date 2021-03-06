package com.itechart.stockOnline.dao.specification;

import com.itechart.stockOnline.model.*;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;

public class StockSpecifications {
    public static Specification<Stock> nameLike(String name) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(Stock_.name)), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Stock> companyLike(String name) {
        return ((root, criteriaQuery, criteriaBuilder) -> {
            Join<Stock, StockOwnerCompany> stockOwnerCompanyJoin = root.join(Stock_.company, JoinType.INNER);

            String lowAddress = "%" + name.toLowerCase() + "%";
            Predicate companyLike = criteriaBuilder.like(criteriaBuilder.lower(stockOwnerCompanyJoin.get(StockOwnerCompany_.name)), lowAddress);

            return criteriaBuilder.or(companyLike);
        });
    }
        public static Specification<Stock> addressLike(String address) {
        return ((root, criteriaQuery, criteriaBuilder) -> {
            Join<Stock, Address> addressJoin = root.join(Stock_.address, JoinType.INNER);

            String lowAddress = "%" + address.toLowerCase() + "%";
            Predicate countryLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.countryName)), lowAddress);
            Predicate cityLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.cityName)), lowAddress);
            Predicate streetLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.street)), lowAddress);
            Predicate homeLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.home).as(String.class)), lowAddress);

            return criteriaBuilder.or(countryLike, cityLike, streetLike, homeLike);
        });
    }
}
