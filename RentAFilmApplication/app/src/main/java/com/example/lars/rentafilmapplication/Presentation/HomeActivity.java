package com.example.lars.rentafilmapplication.Presentation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.lars.rentafilmapplication.R;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);


    }

    @Override
    public void onBackPressed() {
        // zorg dat je back niet kan gebruiken
    }
}
