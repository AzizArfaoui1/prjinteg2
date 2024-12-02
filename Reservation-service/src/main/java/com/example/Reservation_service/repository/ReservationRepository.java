package com.example.Reservation_service.repository;

import com.example.Reservation_service.entity.ReservationEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends MongoRepository<ReservationEntity, String> {
    // Trouver les réservations par utilisateur
    List<ReservationEntity> findByUserId(String userId);

    // Trouver les réservations par prestataire
    List<ReservationEntity> findByProviderId(String providerId);

    // Trouver les réservations par service
    List<ReservationEntity> findByServiceId(String serviceId);

    // Trouver les réservations par statut
    List<ReservationEntity> findByStatus(String status);
}