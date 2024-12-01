package com.example.Localisation_service.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "localisations")
public class Localisation {
    @Id
    private String id;          // ID unique de la localisation
    private String name;        // Nom de la localisation (ville, région, etc.)
    private String description; // Description (optionnelle)

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}