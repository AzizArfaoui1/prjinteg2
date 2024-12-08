package com.example.p1

import android.app.DatePickerDialog
import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.p1.LoginActivity
import java.util.*
import java.util.regex.Pattern

class CreateAccountActivityy : AppCompatActivity() {

    private var isSpinnerInitialized = false  // Variable pour gérer l'initialisation du spinner

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_account)

        // Lien vers l'écran de connexion
        val textViewLogin = findViewById<TextView>(R.id.textView2)
        textViewLogin.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        // Initialisation des champs de saisie
        val editTextName: EditText = findViewById(R.id.editTextName)
        val editTextFirstName: EditText = findViewById(R.id.editTextFirstName)
        val editTextEmail: EditText = findViewById(R.id.editTextEmail)
        val editTextPhone: EditText = findViewById(R.id.editTextPhone)
        val editTextPassword: EditText = findViewById(R.id.editTextPassword)
        val editTextDateOfBirth: EditText = findViewById(R.id.editTextDateOfBirth)
        val radioGroupSex: RadioGroup = findViewById(R.id.radioGroupSex)
        val spinnerGovernorates: Spinner = findViewById(R.id.spinnerGovernorates)
        val progressBar: ProgressBar = findViewById(R.id.progressBar)

        // Initialisation du Spinner pour les gouvernorats
        if (!isSpinnerInitialized) {
            val governorates = arrayOf("Tunis", "Ariana", "Ben Arous", "Manouba")
            val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, governorates)
            spinnerGovernorates.adapter = adapter
            isSpinnerInitialized = true
        }

        // Sélection de la date de naissance
        editTextDateOfBirth.setOnClickListener {
            val calendar = Calendar.getInstance()
            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH)
            val dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH)

            val datePickerDialog = DatePickerDialog(
                this, { _, selectedYear, selectedMonth, selectedDay ->
                    editTextDateOfBirth.setText("$selectedDay/${selectedMonth + 1}/$selectedYear")
                }, year, month, dayOfMonth
            )
            datePickerDialog.show()
        }

        // Action sur le bouton de création de compte
        val buttonCreateAccount: Button = findViewById(R.id.buttonCreateAccount)
        buttonCreateAccount.setOnClickListener {
            val name = editTextName.text.toString()
            val firstName = editTextFirstName.text.toString()
            val email = editTextEmail.text.toString()
            val phone = editTextPhone.text.toString()
            val password = editTextPassword.text.toString()
            val dateOfBirth = editTextDateOfBirth.text.toString()

            // Validation des champs
            if (name.isEmpty() || firstName.isEmpty() || email.isEmpty() || phone.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Tous les champs sont obligatoires", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (!isValidEmail(email)) {
                Toast.makeText(this, "Email invalide", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (!isValidPhone(phone)) {
                Toast.makeText(this, "Numéro de téléphone invalide", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            progressBar.visibility = ProgressBar.VISIBLE

            // Simuler la création du compte (vous pouvez remplacer par une réelle opération de création de compte)
            Thread {
                Thread.sleep(3000)
                runOnUiThread {
                    progressBar.visibility = ProgressBar.GONE
                    Toast.makeText(this, "Compte créé avec succès", Toast.LENGTH_SHORT).show()
                    // Rediriger vers l'écran de connexion
                    val intent = Intent(this, LoginActivity::class.java)
                    startActivity(intent)
                }
            }.start()
        }
    }

    // Vérification de l'email
    private fun isValidEmail(email: String): Boolean {
        val pattern = Pattern.compile(
            "[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
        )
        return pattern.matcher(email).matches()
    }

    // Vérification du numéro de téléphone
    private fun isValidPhone(phone: String): Boolean {
        val pattern = Pattern.compile("^\\+?[0-9]{8,15}\$")
        return pattern.matcher(phone).matches()
    }
}
