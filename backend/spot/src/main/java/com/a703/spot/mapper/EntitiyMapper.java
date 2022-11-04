package com.a703.spot.mapper;

public interface EntitiyMapper<D, E>{
    E toEntity(final D dto);
    D toDto(final E entity);
}
