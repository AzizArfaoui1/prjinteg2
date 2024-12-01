package com.example.Localisation_service.service;

import com.example.Localisation_service.entity.Localisation;
import com.example.Localisation_service.exception.ResourceNotFoundException;
import com.example.Localisation_service.repository.LocalisationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalisationService {

    @Autowired
    private LocalisationRepository localisationRepository;

    public List<Localisation> getAllLocalisations() {
        return localisationRepository.findAll();
    }

    public Localisation getLocalisationById(String id) {
        return localisationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Localisation introuvable avec l'ID : " + id));
    }

    public Localisation createLocalisation(Localisation localisation) {
        return localisationRepository.save(localisation);
    }

    public Localisation updateLocalisation(String id, Localisation localisationDetails) {
        Localisation localisation = getLocalisationById(id);
        localisation.setName(localisationDetails.getName());
        localisation.setLatitude(localisationDetails.getLatitude());
        localisation.setLongitude(localisationDetails.getLongitude());
        localisation.setDescription(localisationDetails.getDescription());
        return localisationRepository.save(localisation);
    }

    public void deleteLocalisation(String id) {
        if (!localisationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Localisation introuvable avec l'ID : " + id);
        }
        localisationRepository.deleteById(id);
    }
}