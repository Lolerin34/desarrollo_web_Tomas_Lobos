package fundacion_patitas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((requests) -> requests
                //Lista blanca
                .requestMatchers(
                    "/",                    // Raiz
                    "/portada/**",          // Portada
                    "/listado/**",          // Listado de avisos
                    "/formulario/**",       // Formulario
                    "/detalle/**",         // Vista de detalles
                    "/estadisticas/**",     // Estadisticas
                    
                    // Recursos estáticos
                    "/css/**", "/js/**", "/images/**", "/uploads/**", "/img/**"
                ).permitAll()
                
                // Zona Privada para el todo poderoso admin
                .requestMatchers("/t5-admin-fotos/**", "/mensajes-log/**").authenticated()
                .anyRequest().authenticated() 
            )
            .formLogin((form) -> form
                .defaultSuccessUrl("/t5-admin-fotos", true)
                .permitAll() 
            )
            .logout((logout) -> logout.permitAll());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user =
                User.withDefaultPasswordEncoder()
                        .username("cc5002")
                        .password("examen")
                        .roles("ADMIN")
                        .build();

        return new InMemoryUserDetailsManager(user);
    }
}