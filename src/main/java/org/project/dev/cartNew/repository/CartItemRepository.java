package org.project.dev.cartNew.repository;

import org.project.dev.cartNew.entity.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {

    CartItemEntity findByCart_CartIdAndProduct_Id(Long cartId, Long productId);

    CartItemEntity findCartItemByCartItemId(Long cartItemId);

    List<CartItemEntity> findListCartItemByCartItemId(Long cartItemId);

    void deleteByCartItemId(Long cartItemId);
}
