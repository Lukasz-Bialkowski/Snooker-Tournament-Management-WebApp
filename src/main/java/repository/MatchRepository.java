package repository;

import entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query("SELECT COUNT(m)" +
            " FROM Match m JOIN m.firstPlayer fp " +
            " JOIN m.secondPlayer sp " +
            "WHERE fp.id = :playerId OR sp.id = :playerId ")
    int getMatchesForPlayer(@Param("playerId") long playerId);

}
