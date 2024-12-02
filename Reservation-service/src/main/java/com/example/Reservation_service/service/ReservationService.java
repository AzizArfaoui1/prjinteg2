package com.example.Reservation_service.service;

import com.example.Reservation_service.entity.ReservationEntity;
import com.example.Reservation_service.exception.ReservationNotFoundException;
import com.example.Reservation_service.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    // Créer une nouvelle réservation
    public ReservationEntity createReservation(ReservationEntity reservation) {
        return reservationRepository.save(reservation);
    }

    // Récupérer toutes les réservations
    public List<ReservationEntity> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Récupérer une réservation par son ID
    public Optional<ReservationEntity> getReservationById(String id) {
        return reservationRepository.findById(id);
    }

    // Mettre à jour une réservation
    public Optional<ReservationEntity> updateReservation(String id, ReservationEntity updatedReservation) {
        Optional<ReservationEntity> existingReservation = reservationRepository.findById(id);
        if (existingReservation.isPresent()) {
            ReservationEntity reservation = existingReservation.get();
            reservation.setDate(updatedReservation.getDate());
            reservation.setServiceId(updatedReservation.getServiceId());
            reservation.setStatus(updatedReservation.getStatus());
            return Optional.of(reservationRepository.save(reservation));
        }
        return Optional.empty();
    }

    // Supprimer une réservation
    public boolean deleteReservation(String id) {
        Optional<ReservationEntity> existingReservation = reservationRepository.findById(id);
        if (existingReservation.isPresent()) {
            reservationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Récupérer les réservations par utilisateur
    public List<ReservationEntity> getReservationsByUser(String userId) {
        return reservationRepository.findByUserId(userId);
    }

    // Récupérer les réservations par prestataire
    public List<ReservationEntity> getReservationsByProvider(String providerId) {
        return reservationRepository.findByProviderId(providerId);
    }

    // Récupérer les réservations par service
    public List<ReservationEntity> getReservationsByService(String serviceId) {
        return reservationRepository.findByServiceId(serviceId);
    }

    // Récupérer les réservations par statut
    public List<ReservationEntity> getReservationsByStatus(String status) {
        return reservationRepository.findByStatus(status);
    }
}
