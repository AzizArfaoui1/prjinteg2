package com.example.p1

import Service
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Response

class CreateServiceActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_service)

        // Initialisation des champs de saisie
        val serviceNameEditText: EditText = findViewById(R.id.serviceNameEditText)
        val descriptionEditText: EditText = findViewById(R.id.descriptionEditText)
        val priceEditText: EditText = findViewById(R.id.priceEditText)
        val dateEditText: EditText = findViewById(R.id.dateEditText)
        val durationEditText: EditText = findViewById(R.id.durationEditText)
        val imageUrlEditText: EditText = findViewById(R.id.imageUrlEditText)
        val serviceImageView: ImageView = findViewById(R.id.serviceImageView)

        // Bouton pour envoyer la demande de création du service
        val createServiceButton: Button = findViewById(R.id.createServiceButton)
        createServiceButton.setOnClickListener {
            val serviceName = serviceNameEditText.text.toString().trim()
            val description = descriptionEditText.text.toString().trim()
            val price = priceEditText.text.toString().trim()
            val date = dateEditText.text.toString().trim()
            val duration = durationEditText.text.toString().trim()
            val imageUrl = imageUrlEditText.text.toString().trim()

            // Vérifier que les champs ne sont pas vides
            if (serviceName.isEmpty() || description.isEmpty() || price.isEmpty() || date.isEmpty() || duration.isEmpty() || imageUrl.isEmpty()) {
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Validation du prix
            val priceDouble = price.toDoubleOrNull()
            if (priceDouble == null || priceDouble <= 0) {
                Toast.makeText(this, "Veuillez entrer un prix valide supérieur à 0", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Charger l'image dynamiquement avec Glide
            Glide.with(this)
                .load(imageUrl)
                .error(android.R.drawable.ic_dialog_alert) // Icône système par défaut en cas d'erreur
                .into(serviceImageView)


            // Créer l'objet Service
            val service = Service(
                serviceName = serviceName,
                description = description,
                price = priceDouble,
                date = date,
                duree = duration,
                imageUrl = imageUrl
            )

            // Appeler la méthode pour créer le service
            createService(service)
        }
    }

    private fun createService(service: Service) {
        val apiService = ApiClient.retrofit.create(ApiService::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                // Envoyer la requête au serveur
                val response: Response<Service> = apiService.createService(service)

                withContext(Dispatchers.Main) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@CreateServiceActivity, "Service créé avec succès", Toast.LENGTH_SHORT).show()
                        setResult(RESULT_OK) // Retourne un résultat à l'activité précédente
                        finish() // Terminer cette activité
                    } else {
                        val errorMessage = response.errorBody()?.string() ?: "Erreur inconnue"
                        Toast.makeText(this@CreateServiceActivity, "Erreur : $errorMessage", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(
                        this@CreateServiceActivity,
                        "Erreur lors de la création du service : ${e.localizedMessage}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }
}
