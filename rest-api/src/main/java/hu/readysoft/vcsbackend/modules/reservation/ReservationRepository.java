package hu.readysoft.vcsbackend.modules.reservation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findAllByStatus(ReservationStatus status);
}
