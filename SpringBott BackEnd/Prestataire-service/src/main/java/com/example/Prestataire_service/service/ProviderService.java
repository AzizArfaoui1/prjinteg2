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

    public Provider getProviderById(String id) {
        Optional<Provider> provider = providerRepository.findById(id);
        return provider.orElseThrow(() -> new RuntimeException("Provider not found with id: " + id)); // Lancer une exception si non trouvé
    }

    public Provider createProvider(Provider provider) {
        return providerRepository.save(provider);
    }

    public Provider updateProvider(String id, Provider providerDetails) {
        Provider existingProvider = getProviderById(id);  // Cette méthode lance une exception si non trouvé
        existingProvider.setUsername(providerDetails.getUsername());
        existingProvider.setPassword(providerDetails.getPassword());
        existingProvider.setJob(providerDetails.getJob());
        existingProvider.setFirstname(providerDetails.getFirstname());
        existingProvider.setLastname(providerDetails.getLastname());
        existingProvider.setEmail(providerDetails.getEmail());
        existingProvider.setLocation(providerDetails.getLocation());
        existingProvider.setComments(providerDetails.getComments());
        existingProvider.setPhone(providerDetails.getPhone());
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
