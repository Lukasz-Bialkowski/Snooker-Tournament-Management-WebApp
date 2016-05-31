package repository;

import entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query("SELECT p " +
            "FROM Player p " +
            "WHERE p IN " +
            " (SELECT mo.firstPlayer" +
            " FROM Tournament t JOIN t.matches mo " +
            " WHERE t.id=:tournamentId)" +
            " OR p.id IN " +
            " (SELECT mo.secondPlayer" +
            " FROM Tournament t JOIN t.matches mo " +
            " WHERE t.id=:tournamentId)")
    List<Player> filterPlayersByTournament(@Param("tournamentId") Long tournamentId);
}
