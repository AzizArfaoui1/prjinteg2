package com.example.Reservation_service.service;


import com.example.Reservation_service.entity.ReservationEntity;
import com.example.Reservation_service.exception.ReservationNotFoundException;
import com.example.Reservation_service.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<ReservationEntity> getAllReservations() {
        return reservationRepository.findAll();
    }

    public ReservationEntity getReservationById(String id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Réservation introuvable avec l'ID : " + id));
    }

    public List<ReservationEntity> getReservationsByUserId(String userId) {
        return reservationRepository.findByUserId(userId);
    }

    public List<ReservationEntity> getReservationsByProviderId(String providerId) {
        return reservationRepository.findByProviderId(providerId);
    }

    public ReservationEntity createReservation(ReservationEntity reservation) {
        return reservationRepository.save(reservation);
    }

    public ReservationEntity updateReservation(String id, ReservationEntity reservationDetails) {
        ReservationEntity reservation = getReservationById(id);
        reservation.setDate(reservationDetails.getDate());
        reservation.setStatus(reservationDetails.getStatus());
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(String id) {
        if (!reservationRepository.existsById(id)) {
            throw new ReservationNotFoundException("Réservation introuvable avec l'ID : " + id);
        }
        reservationRepository.deleteById(id);
    }
}
