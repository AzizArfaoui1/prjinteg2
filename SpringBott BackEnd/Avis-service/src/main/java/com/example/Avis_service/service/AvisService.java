package com.example.Avis_service.service;


import com.example.Avis_service.entity.Avis;
import com.example.Avis_service.repository.AvisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvisService {

    @Autowired
    private AvisRepository avisRepository;

    public List<Avis> getAllAvis() {
        return avisRepository.findAll();
    }

    public Avis getAvisById(String id) {
        return avisRepository.findById(id).orElse(null); // Retourne null si non trouvé
    }

    public List<Avis> getAvisByTargetId(String targetId) {
        return avisRepository.findByTargetId(targetId);
    }

    public Avis createAvis(Avis avis) {
        return avisRepository.save(avis);
    }

    public Avis updateAvis(String id, Avis avisDetails) {
        Avis avis = getAvisById(id);
        if (avis == null) {
            return null; // Gestion alternative si l'avis n'existe pas
        }
        avis.setRating(avisDetails.getRating());
        avis.setComment(avisDetails.getComment());
        avis.setDate(avisDetails.getDate());
        return avisRepository.save(avis);
    }

    public boolean deleteAvis(String id) {
        if (!avisRepository.existsById(id)) {
            return false; // Indiquer que l'avis n'a pas été trouvé
        }
        avisRepository.deleteById(id);
        return true; // Suppression réussie
    }
}
