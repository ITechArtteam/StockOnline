package com.itechart.stockOnline.dao.specification;


import com.itechart.stockOnline.model.Address;
import com.itechart.stockOnline.model.Address_;
import com.itechart.stockOnline.model.StockOwnerCompany;
import com.itechart.stockOnline.model.StockOwnerCompany_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;

public class StockOwnerCompanySpecifications {
    public static Specification<StockOwnerCompany> nameLike(String name) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(StockOwnerCompany_.name)), "%" + name.toLowerCase() + "%");
    }

    public static Specification<StockOwnerCompany> addressLike(String address) {
        return ((root, criteriaQuery, criteriaBuilder) -> {
            Join<StockOwnerCompany, Address> addressJoin = root.join(StockOwnerCompany_.address, JoinType.INNER);

            String lowAddress = "%" + address.toLowerCase() + "%";
            Predicate countryLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.countryName)), lowAddress);
            Predicate cityLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.cityName)), lowAddress);
            Predicate streetLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.street)), lowAddress);
            Predicate roomLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.room).as(String.class)), lowAddress);
            Predicate homeLike = criteriaBuilder.like(criteriaBuilder.lower(addressJoin.get(Address_.home).as(String.class)), lowAddress);
            return criteriaBuilder.or(countryLike, cityLike, streetLike, roomLike, homeLike);
        });
    }

    public static Specification<StockOwnerCompany> statusEqual(boolean status) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get(StockOwnerCompany_.isActive), status);
    }
}
