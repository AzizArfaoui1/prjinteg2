package com.example.p1

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ServiceDetailActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_service_detail)

        // Récupérer l'ID du service à partir de l'intent
        val serviceId = intent.getStringExtra("SERVICE_ID")

        // Vérifier si un ID de service est passé
        if (serviceId != null) {
            loadServiceDetails(serviceId)
        } else {
            Toast.makeText(this, "Erreur: ID du service introuvable", Toast.LENGTH_SHORT).show()
        }

        // Gestionnaire de clic pour le bouton "Retour à la liste des services"
        val backButton = findViewById<Button>(R.id.buttonBackToServices)
        backButton.setOnClickListener {
            // Retourner à la liste des services
            val intent = Intent(this@ServiceDetailActivity, ServicesActivity::class.java)
            startActivity(intent)  // Démarre l'activité de la liste des services
            finish()  // Ferme l'activité actuelle
        }
    }

    private fun loadServiceDetails(serviceId: String) {
        val apiService = ApiClient.retrofit.create(ApiService::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = apiService.getServiceById(serviceId)
                if (response.isSuccessful) {
                    val service = response.body()
                    withContext(Dispatchers.Main) {
                        // Afficher les détails du service
                        findViewById<TextView>(R.id.serviceNameTextView).text = service?.serviceName
                        findViewById<TextView>(R.id.serviceDescriptionTextView).text = service?.description
                        findViewById<TextView>(R.id.servicePriceTextView).text = "Prix : ${service?.price} €"
                        findViewById<TextView>(R.id.serviceDurationTextView).text = "Durée : ${service?.duree}"

                        // Charger l'image du service avec Glide
                        val imageView = findViewById<ImageView>(R.id.serviceImageView)
                        service?.imageUrl?.let {
                            Glide.with(this@ServiceDetailActivity)
                                .load(it) // Charger l'image depuis l'URL
                                .placeholder(android.R.drawable.progress_horizontal) // Image de chargement
                                .error(android.R.drawable.ic_dialog_alert) // Image en cas d'erreur
                                .into(imageView)
                        }
                    }
                } else {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@ServiceDetailActivity, "Erreur de chargement", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ServiceDetailActivity, "Erreur : ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}
