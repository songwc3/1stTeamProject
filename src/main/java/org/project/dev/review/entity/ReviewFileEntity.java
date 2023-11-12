package org.project.dev.review.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.project.dev.utils.BaseEntity;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "review_file")
public class ReviewFileEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long id;


    @Column(nullable = false)
    private String fileOldName;

    @Column(nullable = false)
    private String fileNewName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private ReviewEntity reviewEntity;


    public static ReviewFileEntity toReviewFileEntity(ReviewEntity reviewEntity, String fileOldName, String fileNewName) {
        ReviewFileEntity reviewFileEntity = new ReviewFileEntity();
        reviewFileEntity.setReviewEntity(reviewEntity);
        reviewFileEntity.setFileOldName(fileOldName);
        reviewFileEntity.setFileNewName(fileNewName);

        return reviewFileEntity;
    }
}