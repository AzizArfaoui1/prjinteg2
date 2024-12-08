package com.example.p1 // Remplacez par votre package

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.p1.R

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // Initialisation des éléments de la vue à partir du fichier XML
        val editTextEmail = findViewById<EditText>(R.id.editTextEmail) // Champ Email
        val editTextPassword = findViewById<EditText>(R.id.editTextPassword) // Champ Mot de passe
        val buttonLogin = findViewById<Button>(R.id.buttonLogin) // Bouton Connexion
        val textViewForgotPassword = findViewById<TextView>(R.id.textViewForgotPassword) // Lien Mot de passe oublié
        val textViewCreateAccount = findViewById<TextView>(R.id.textViewCreateAccount) // Lien Créer un compte

        // Événement de clic pour le bouton "Se connecter"
        buttonLogin.setOnClickListener {
            val email = editTextEmail.text.toString() // Récupère l'email saisi
            val password = editTextPassword.text.toString() // Récupère le mot de passe saisi

            // Vérifie si les champs sont remplis
            if (email.isNotEmpty() && password.isNotEmpty()) {
                // Si les champs sont remplis, affiche un message de succès
                Toast.makeText(this, "Connexion réussie", Toast.LENGTH_SHORT).show()
            } else {
                // Si l'un des champs est vide, affiche un message d'erreur
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            }
        }

        // Événement de clic pour "Mot de passe oublié"
        textViewForgotPassword.setOnClickListener {
            // Affiche un message indiquant que "Mot de passe oublié" a été cliqué
            Toast.makeText(this, "Mot de passe oublié cliqué", Toast.LENGTH_SHORT).show()
        }

        // Événement de clic pour "Créer un compte"
        textViewCreateAccount.setOnClickListener {
            // Ouvre l'activité pour créer un nouveau compte
            val intent = Intent(this, CreateAccountActivityy::class.java)
            startActivity(intent) // Lance l'activité
        }
    }
}
