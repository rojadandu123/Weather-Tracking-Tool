package com.weather.weatherbackend.repository;

import com.weather.weatherbackend.model.Weather;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
}