package com.example.Prestataire_service.service;

import com.example.Prestataire_service.entity.Provider;
import com.example.Prestataire_service.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    public Provider getProviderById(String providerId) {
        return providerRepository.findById(providerId).orElse(null);
    }
    public Provider createProvider(Provider provider) {
        return providerRepository.save(provider);
    }

    public Provider updateProvider(String id, Provider providerDetails) {
        Provider existingProvider = getProviderById(id);  // Cette méthode lance une exception si non trouvé
        existingProvider.setUsername(providerDetails.getUsername());
        existingProvider.setPassword(providerDetails.getPassword());
        existingProvider.setFirstName(providerDetails.getFirstName());
        existingProvider.setLastName(providerDetails.getLastName());
        existingProvider.setEmail(providerDetails.getEmail());
        existingProvider.setPhone(providerDetails.getPhone());
        existingProvider.setDateNaiss(providerDetails.getDateNaiss());
        return providerRepository.save(existingProvider);
    }

    public boolean deleteProvider(String id) {
        if (!providerRepository.existsById(id)) {
            return false; // Retourne false si le prestataire n'existe pas
        }
        providerRepository.deleteById(id);
        return true; // Retourne true après la suppression
    }
}
