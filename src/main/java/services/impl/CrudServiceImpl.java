package services.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import services.CrudService;
import java.util.List;

public abstract class CrudServiceImpl<T> implements CrudService<T> {

    public List<T> list() {
        return this.getRepository().findAll();
    }

    public T get(Long id) {
        return this.getRepository().findOne(id);
    }

    public T save(T entity) {
        return this.getRepository().save(entity);
    }

    public void remove(Long id) {
        this.getRepository().delete(id);
    }

    protected abstract JpaRepository<T, Long> getRepository();

}
