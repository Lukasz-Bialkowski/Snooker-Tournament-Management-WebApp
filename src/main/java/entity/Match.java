package entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Match {

    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    @JoinColumn
    Tournament tournament;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonBackReference
    List<Frame> frames = new ArrayList<>();

    @OneToOne
    @JoinColumn
    Player firstPlayer;

    @OneToOne
    @JoinColumn
    Player secondPlayer;

    public Tournament getTournament() {
        return tournament;
    }

    public Player getFirstPlayer() {
        return firstPlayer;
    }

    public void setFirstPlayer(Player firstPlayer) {
        this.firstPlayer = firstPlayer;
    }

    public Player getSecondPlayer() {
        return secondPlayer;
    }

    public void setSecondPlayer(Player secondPlayer) {
        this.secondPlayer = secondPlayer;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Frame> getFrames() {
        return frames;
    }

    public void setFrames(List<Frame> frames) {
        this.frames = frames;
    }

    @Override
    public String toString() {
        return "Match{" +
                "id=" + id +
                ", tournament=" + tournament +
                ", frames=" + frames +
                ", firstPlayer=" + firstPlayer +
                ", secondPlayer=" + secondPlayer +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Match match = (Match) o;

        if (id != null ? !id.equals(match.id) : match.id != null) return false;
        if (tournament != null ? !tournament.equals(match.tournament) : match.tournament != null) return false;
        if (frames != null ? !frames.equals(match.frames) : match.frames != null) return false;
        if (firstPlayer != null ? !firstPlayer.equals(match.firstPlayer) : match.firstPlayer != null) return false;
        return !(secondPlayer != null ? !secondPlayer.equals(match.secondPlayer) : match.secondPlayer != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (tournament != null ? tournament.hashCode() : 0);
        result = 31 * result + (frames != null ? frames.hashCode() : 0);
        result = 31 * result + (firstPlayer != null ? firstPlayer.hashCode() : 0);
        result = 31 * result + (secondPlayer != null ? secondPlayer.hashCode() : 0);
        return result;
    }
}
