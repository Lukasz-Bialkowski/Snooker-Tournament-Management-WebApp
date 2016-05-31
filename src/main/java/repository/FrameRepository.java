package repository;

import entity.Frame;
import entity.Match;
import entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FrameRepository extends JpaRepository<Frame, Long> {



}
