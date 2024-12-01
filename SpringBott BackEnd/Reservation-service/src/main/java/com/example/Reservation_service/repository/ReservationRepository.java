package com.example.Reservation_service.repository;

import com.example.Reservation_service.entity.ReservationEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends MongoRepository<ReservationEntity, String> {
    List<ReservationEntity> findByUserId(String userId);
    List<ReservationEntity> findByProviderId(String providerId);
}