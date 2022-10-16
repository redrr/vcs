package hu.readysoft.vcsbackend.modules.reservation;

import hu.readysoft.vcsbackend.common.BaseModel;
import hu.readysoft.vcsbackend.common.RestUIBuilder;
import hu.readysoft.vcsbackend.common.Utils;
import hu.readysoft.vcsbackend.common.table.TableBuilder;
import org.json.JSONArray;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/reservations")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReservationController extends RestUIBuilder<Reservation, ReservationRepository> {

    @Override
    public Class<Reservation> getModelClass() {
        return Reservation.class;
    }

    @Override
    public TableBuilder dataTableUI() {
        return new TableBuilder()
                .column(BaseModel.Fields.id)
                .column(Reservation.Fields.user)
                .column(Reservation.Fields.vehicle)
                .column(Reservation.Fields.placeOfDelegation)
                .column(Reservation.Fields.startOfDelegation)
                .column(Reservation.Fields.endOfDelegation)
                .column(Reservation.Fields.status);
    }

    @GetMapping("/calendar")
    public ResponseEntity<List<ReservationEventDTO>> getCalendarEvents() {
        List<ReservationEventDTO> events = new ArrayList<>();
        for (Reservation reservation : getRepository().findAllByStatus(ReservationStatus.ACCEPTED)) {
            ReservationEventDTO event = new ReservationEventDTO();
            event.setTitle(reservation.getVehicle().toString());
            event.setStart(Utils.getDate(reservation.getStartOfDelegation()));
            event.setEnd(Utils.getDate(reservation.getEndOfDelegation()));
            event.setColor(reservation.getVehicle().getColor());
            events.add(event);
        }
        return ResponseEntity.ok(events);
    }

    @PostMapping("/accept")
    public ResponseEntity<?> accept(@RequestBody String json) {
        return ResponseEntity.ok(changeStatus(new JSONArray(json), ReservationStatus.ACCEPTED));
    }

    @PostMapping("/decline")
    public ResponseEntity<?> decline(@RequestBody String json) {
        return ResponseEntity.ok(changeStatus(new JSONArray(json), ReservationStatus.DECLINED));
    }

    private boolean changeStatus(JSONArray array, ReservationStatus status) {
        for (int i = 0; i < array.length(); i++) {
            Optional<Reservation> optionalReservation = getRepository().findById(array.getInt(i));
            if (optionalReservation.isEmpty())
                return false;
            Reservation reservation = optionalReservation.get();
            reservation.setStatus(status);
            getRepository().save(reservation);
        }
        return true;
    }
}
