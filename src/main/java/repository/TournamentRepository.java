package repository;

import entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {

    @Query("SELECT t" +
            " FROM Tournament t JOIN t.matches mo " +
            "WHERE mo.id IN " +
                "(SELECT m.id" +
                    " FROM Match m JOIN m.frames f " +
                    " GROUP BY m.id " +
                    " HAVING SUM(f.firstPlayerScore)>1000 " +
                    "   OR SUM(f.secondPlayerScore)>1000 )" +
                "AND t.year = :year")
    List<Tournament> findTournamentByYearInWhichPlayerScoredAtLeast1000(@Param("year") int year);

}
