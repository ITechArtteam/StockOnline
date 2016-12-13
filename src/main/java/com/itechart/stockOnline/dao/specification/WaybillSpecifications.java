package com.itechart.stockOnline.dao.specification;

import com.itechart.stockOnline.model.*;
import com.itechart.stockOnline.model.enums.WaybillStatus;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;

public class WaybillSpecifications {
    public static Specification<Waybill> numberLike(String number) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(Waybill_.number)), "%" + number.toLowerCase() + "%");
    }

    public static Specification<Waybill> loginLike(String login) {
        return ((root, criteriaQuery, criteriaBuilder) -> {
            Join<Waybill, User> waybillUserJoin = root.join(Waybill_.registeredBy, JoinType.INNER);

            String lowLogin = "%" + login.toLowerCase() + "%";
            return criteriaBuilder.like(criteriaBuilder.lower(waybillUserJoin.get(User_.login)), lowLogin);
        });
    }

    public static Specification<Waybill> typeIncome() {
        return ((root, criteriaQuery, criteriaBuilder) -> {

            Predicate isJoined = criteriaBuilder.equal(root.get(Waybill_.status), WaybillStatus.JOINED);
            Predicate isCheckingComplete = criteriaBuilder.equal(root.get(Waybill_.status), WaybillStatus.CHECKING_COMPLETED);
            Predicate isRegistrationCompleted = criteriaBuilder.equal(root.get(Waybill_.status), WaybillStatus.REGISTRATION_COMPLETED);

            return criteriaBuilder.or(isJoined, isCheckingComplete, isRegistrationCompleted);
        });
    }
    public static Specification<Waybill> typeOutcome() {
        return ((root, criteriaQuery, criteriaBuilder) -> {

            Predicate isBatchFormed = criteriaBuilder.equal(root.get(Waybill_.status), WaybillStatus.BATCH_FORMED);
            Predicate isOutputResolved = criteriaBuilder.equal(root.get(Waybill_.status), WaybillStatus.OUTPUT_RESOLVED);
            Predicate isOutOfStock = criteriaBuilder.equal(root.get(Waybill_.status), WaybillStatus.OUT_OF_STOCK);

            return criteriaBuilder.or(isBatchFormed, isOutputResolved, isOutOfStock);
        });
    }
}
