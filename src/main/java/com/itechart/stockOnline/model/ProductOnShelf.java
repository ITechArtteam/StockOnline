package com.itechart.stockOnline.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "product_on_shelf")
public class ProductOnShelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "count")
    private Integer count;

    @Column(name = "begin_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date beginDate;

    @Column(name = "end_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "shelf_id")
    private Shelf shelf;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "placed_by")
    private User user;

    public ProductOnShelf() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }

    public Date getBeginDate() { return beginDate; }
    public void setBeginDate(Date beginDate) { this.beginDate = beginDate; }

    public Date getEndDate() { return endDate; }
    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public Shelf getShelf() { return shelf; }
    public void setShelf(Shelf shelf) { this.shelf = shelf; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return "ProductOnShelf{" +
                "id=" + id +
                ", count=" + count +
                ", beginDate=" + beginDate +
                ", endDate=" + endDate +
                ", shelf=" + shelf +
                ", product=" + product +
                ", user=" + user +
                '}';
    }
}
