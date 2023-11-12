package org.project.dev.member.repository;

import org.project.dev.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByMemberEmail(String memberEmail);

//    boolean existsByMemberEmail(String memberEmail);

    boolean existsByMemberNickName(String memberNickName);

    boolean existsByMemberPhone(String memberPhone);
    
    // 이메일 찾기
    MemberEntity findByMemberNickNameAndMemberPhone(String memberNickName, String memberPhone);
    
    // 비밀번호 찾기
    MemberEntity findByMemberEmailAndMemberPhone(String memberEmail, String memberPhone);

}


