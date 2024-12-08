package com.example.p1

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialisation des éléments de la vue
        val createAccountLink: TextView = findViewById(R.id.createAccountLink)
        val connexionBTN: Button = findViewById(R.id.connexionBTN)

        // Événement de clic pour le lien "Créer un compte"
        createAccountLink.setOnClickListener {
            // Naviguer vers la page de création de compte
            val intent = Intent(this, CreateAccountActivityy::class.java)
            startActivity(intent)
        }

        // Événement de clic pour le bouton "Connexion"
        connexionBTN.setOnClickListener {
            // Naviguer vers la page de connexion
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }
        val viewServicesButton: Button = findViewById(R.id.viewServicesButton)
        viewServicesButton.setOnClickListener {
            val intent = Intent(this, ServicesActivity::class.java)
            startActivity(intent)
        }



    }

}
