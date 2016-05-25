package repository;

import entity.Match;
import entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchReposotory extends JpaRepository<Match, Long> {
}
