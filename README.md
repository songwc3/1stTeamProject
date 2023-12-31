﻿![1차 로고](https://github.com/songwc3/1stTeamProject/assets/133622405/62516207-24d4-46b0-ba0b-e3e5286da634)

# 🛒1차 팀프로젝트 : 쇼핑몰 만들기 - Cloth Keeper🛒
<br/>

## 📌프로젝트 개요
 - 개발기간 : 2023. 08. 25 ~ 2023. 09. 25 <br/>
 - 주제선정이유 : 이번 쇼핑몰 프로젝트는 KREAM이라는 쇼핑몰을 참고했고 UI가 깔끔하고 상품에 대한 직관성이 뚜렷해 참고하게되었습니다.
<details>
<summary>KREAM 메인페이지</summary>

<br/>

<img width="1277" alt="크림" src="https://github.com/songwc3/1stTeamProject/assets/133622405/c0a04130-e1f8-4ca1-9434-40129b9ece2a">
</details>

<br/>

## 📂프로젝트 소개
- 쇼핑몰(KREAM)을 참고하여 만든 쇼핑몰입니다.
- Spring Security를 이용하여 일반회원, 간편회원 로그인으로 분기처리하고 OAuth2.0 로그인을 추가했습니다.
- 시나리오형 챗봇 기능을 구현했습니다.
- Github Actions와 AWS EC2를 이용해 CI/CD 환경을 구축했습니다.
<details>
<summary>메인페이지, PDF</summary>

<br/>

['1차 팀프로젝트 PDF' 열기](https://drive.google.com/file/d/1QTk4X3RtYbiqo63tg8wosyQCucps9zUQ/view?usp=share_link)

![메인페이지](https://github.com/songwc3/1stTeamProject/assets/133622405/9aaf27a8-5dae-41f9-a759-d4cb4343ede4)



</details>



<br/>

## 💻개발환경
- Language : Java11, Javascript, HTML5, CSS3
- Framework : Spring boot
- IDE : IntelliJ IDEA
- Template Engine : Thymeleaf
- Database : MySQL
- ORM : JPA
- Version Management : Git, Github

<br/>

## 📑DB 구조
<details>
<summary>상세보기(담당한 부분)</summary>

<br/>

- 회원(Member) <br/>
  &nbsp;회원 당 장바구니 1개를 설정했습니다. <br/>
  &nbsp;회원 당 프로필 이미지 1개만 등록가능하도록 설정했습니다. <br/>
  &nbsp;회원 당 상품은 여러개 등록 가능하도록 설정했습니다. <br/>
  &nbsp;회원 당 문의사항은 여러개 등록 가능하도록 설정했습니다. <br/><br/>

- 간편회원(SemiMember) <br/>
  &nbsp;간편회원 당 장바구니 1개를 설정했습니다. <br/>
  &nbsp;간편회원 당 상품 여러개 등록 가능하도록 설정했습니다. <br/><br/>

- 장바구니(Cart) <br/>
  &nbsp;장바구니엔 장바구니상품 여러개가 담길수있도록 설정했습니다. <br/><br/>

- 장바구니상품(CartItem) <br/>
  &nbsp;상품 하나는 장바구니상품 여러개를 가질수있도록 설정했습니다. <br/><br/>
  [1차팀프로젝트 DB.pdf](https://github.com/songwc3/1stTeamProject/files/13327449/1.DB.pdf)
![1차팀플 DB ERD](https://github.com/songwc3/1stTeamProject/assets/133622405/1fa19191-183f-4c22-984d-f5b326a4722a)
</details>

<br/>

## 🏓팀 구성 및 역할
### 😃팀원 송원철

<br/>

#### 로그인(Spring Security, OAuth2.0)
<details>
<summary>상세보기</summary>

<br/>

![로그인 선택창](https://github.com/songwc3/1stTeamProject/assets/133622405/3a619ce3-b9a6-4ae8-aabe-2bd968b82745)
인증 및 인가를 처리하는 Spring Security FilterChain을 이용해 페이지별 접근권한 및 로그인 설정을 구현하고 <br/> 
사용자가 선택해서 로그인할 수 있도록 로그인을 분기처리했습니다. 
<br/><br/>

![일반회원 로그인창](https://github.com/songwc3/1stTeamProject/assets/133622405/00bfce95-0b4e-4aa7-ab9b-281ddc5f4686)
loadUserByUsername 메서드를 통해 반환된 MyUserDetails 객체를 이용해 <br/> 
사용자를 인증하고 로그인을 수행합니다. <br/><br/>

![구글 oauth](https://github.com/songwc3/1stTeamProject/assets/133622405/3426e58b-8535-4d98-891b-52a239103316)
![네이버 oauth](https://github.com/songwc3/1stTeamProject/assets/133622405/9d43f7ee-deb1-48dd-a0b6-d6e1c14dbf00)
![카카오 oauth](https://github.com/songwc3/1stTeamProject/assets/133622405/bbc75e33-ac61-4af5-9eb2-75d5829569af)
OAuth2.0 설정을 통해 구글, 네이버, 카카오를 이용한 소셜로그인을 수행합니다.
<br/>
<br/>

````
===========================================
// ==============WebSecurityConfigClass============
@Configuration
    @Order(1)
    public static class UserConfig{

    @Bean
    public SecurityFilterChain filterChainApp1(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                .antMatchers("/", "/member/join", "/member/login", "/product/list").permitAll()
                .antMatchers("/member/logout", "/member/detail/**", "/member/update/**", "/member/updateImage/**", "/member/delete/**",
                        "/board/**", "/cart/**", "/member/inquiry**", "/member/confirmEmail/**", "/member/confirmPassword/**", "/inquiry/**").authenticated()
                .antMatchers("/product/manage", "/product/write").hasAnyRole("SELLER", "ADMIN")
                .antMatchers("/member/list", "/member/pagingList**").hasAnyRole("ADMIN")

        // 로그인
                .and()
                .formLogin()
                .loginPage("/member/login")
                .usernameParameter("memberEmail")
                .passwordParameter("memberPassword")
                .loginProcessingUrl("/member/login/post")
                .failureUrl("/login")
                .defaultSuccessUrl("/")

                .and()
                .oauth2Login()
                .loginPage("/login")
                .userInfoEndpoint()
                .userService(myAuth2UserService());

        // 로그아웃
        http.logout()
                .logoutUrl("/member/logout")
                .logoutSuccessUrl("/")

                .and()
                .csrf().disable()
                .authenticationProvider(userAuthenticationProvider());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> myAuth2UserService() {
        return new MyOAuth2UserService();
    }

    @Bean
    public UserDetailsServiceImpl userDetailsService(){
        return new UserDetailsServiceImpl();
    }

    @Bean
    public DaoAuthenticationProvider userAuthenticationProvider(){
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
}

@Configuration
@Order(2)
public static class SemiUserConfig {

    @Bean
    public SecurityFilterChain filterChainApp2(HttpSecurity http) throws Exception {
        http.antMatcher("/semiMember/**")
                .authorizeHttpRequests()
                .antMatchers("/", "/login").permitAll()
                .antMatchers("/semiMember/detail/**").hasAnyRole("SEMIMEMBER", "ADMIN")
                .antMatchers("/semiMember/pagingList**").hasAnyRole("ADMIN")

                .and()
                .formLogin()
                .loginPage("/semiMember/login")
                .usernameParameter("semiMemberEmail")
                .passwordParameter("semiMemberPhone")
                .loginProcessingUrl("/semiMember/login/post")
                .failureUrl("/login")
                .defaultSuccessUrl("/")

                .and()
                .logout()
                .logoutUrl("/semiMember/logout")
                .logoutSuccessUrl("/")

                .and()
                .csrf().disable()
                .authenticationProvider(semiUserAuthenticationProvider());
        return http.build();
    }

    @Bean
    public SemiUserDetailsServiceImpl semiUserDetailsService() {
        return new SemiUserDetailsServiceImpl();
    }

    @Bean
    public PasswordEncoder semiPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider semiUserAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(semiUserDetailsService());
        provider.setPasswordEncoder(semiPasswordEncoder());
        return provider;
    }
}
===========================================
// ==============UserDetailsServiceImpl============  
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String memberEmail) throws UsernameNotFoundException {

        MemberEntity memberEntity= memberRepository.findByMemberEmail(memberEmail).orElseThrow(()->{
            throw new UsernameNotFoundException("이메일이 없습니다");
        });

        return new MyUserDetails(memberEntity);
    }
}


===========================================
// ==============MyUserDetails ============  
@Data
@NoArgsConstructor
public class MyUserDetails implements UserDetails, OAuth2User {

    @Autowired
    private MemberEntity memberEntity;

    private Map<String, Object> attributes;

    // 일반
    public MyUserDetails(MemberEntity memberEntity) {
        this.memberEntity = memberEntity;
    }

    // OAuth2
    public MyUserDetails(MemberEntity memberEntity, Map<String, Object> attributes) {
        this.memberEntity = memberEntity;
        this.attributes = attributes;
    }

    // 권한
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collectRole = new ArrayList<>();
        collectRole.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return "ROLE_" + memberEntity.getRole().toString(); // ROLE_
            }
        });
        return collectRole;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return memberEntity.getMemberEmail();
    }

    @Override
    public String getPassword() {
        return memberEntity.getMemberPassword();
    }

    @Override
    public String getUsername() {
        return memberEntity.getMemberEmail();
    }

    // 계정 만료 여부
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정 잠김 여부
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호 만료 여부
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 사용자 활성화 여부
    @Override
    public boolean isEnabled() {
        return true;
    }

}

===========================================
// ==============MyOAuth2UserService============ 
@Slf4j
@Service
public class MyOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageServiceImpl imageService;

    // 이미지 URL 기본값 설정(이미지 없을 경우 기본 이미지로 설정)
    private String defaultImageUrl = "/profileImages/default.png";

    @Value("${file.productImgUploadDir}")
    private String uploadFolder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        ClientRegistration clientRegistration = userRequest.getClientRegistration();
        String clientId = clientRegistration.getClientId();
        String registrationId = clientRegistration.getRegistrationId();
        String registrationName = clientRegistration.getClientName();

        // 테스트하고 잘 나오면 지우기
        System.out.println("==================================");
        System.out.println("clientId : " + clientId);
        System.out.println("registrationId : " + registrationId);
        System.out.println("registrationName : " + registrationName);
        System.out.println("==================================");

        Map<String, Object> attributes = oAuth2User.getAttributes();

        for (String key : attributes.keySet()) {
            System.out.println(key + ": " + attributes.get(key));
        }

        String memberEmail = "";
        String memberPassword = "randomPassword"; // DB에서 임의로 암호화시킴
        String memberName = "";
        String memberNickName = "";
        String memberPhone="";
        String memberBirth="";
        String memberPostCode="";


        if (registrationId.equals("google")) {
            System.out.println("google 로그인");

            memberEmail = (String) attributes.get("email");
            memberName = (String) attributes.get("name");

        } else if (registrationId.equals("naver")) {
            System.out.println("naver 로그인");

            Map<String, Object> response = (Map<String, Object>) attributes.get("response");

            memberEmail = (String) response.get("email");
            memberName= (String) response.get("name");
            memberNickName = (String) response.get("nickname");
            // 휴대전화번호 데이터 형식 변환
            memberPhone = transformPhoneNumber((String) response.get("mobile"));
            memberBirth=(String) response.get("birthday");

            System.out.println((String) response.get("id"));
            System.out.println((String) response.get("email"));
            System.out.println((String) response.get("name"));

        } else if (registrationId.equals("kakao")) {
            System.out.println("kakao 로그인");

            Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");
            System.out.println("response : " + response);
            System.out.println("response - email : " + response.get("email"));
            System.out.println("response - birth : " + response.get("birthday"));

            Map<String, Object> profile = (Map<String, Object>) response.get("profile");
            System.out.println("response - nickname : " + profile.get("nickname"));

            memberEmail = (String) response.get("email");
            memberNickName = (String) profile.get("nickname");
            memberBirth=(String) response.get("birthday");
        }

        // 휴대전화번호가 비어있는 경우 임의의 15자리 숫자 생성
        if (memberPhone.isEmpty()) {
            memberPhone = generateRandomPhoneNumber();
        }

        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByMemberEmail(memberEmail);
        if (optionalMemberEntity.isPresent()) {

//            OAuthUser → DB 비교, 있으면
            return new MyUserDetails(optionalMemberEntity.get());
        }

        MemberEntity memberEntity = memberRepository.save(MemberEntity.builder()
                .memberEmail(memberEmail)
                .memberPassword(passwordEncoder.encode(memberPassword))
                .memberName(memberName)
                .memberNickName(memberNickName)
                .memberPhone(memberPhone)
                .memberBirth(memberBirth)
                .memberPostCode(memberPostCode)
                .role(Role.ADMIN)
                .build());
        
        // 회원가입 후 장바구니 생성
        createCartForMember(memberEntity);

        // OAuth 로그인 후 이미지를 업로드합니다.
        ImageUploadDto imageUploadDto = new ImageUploadDto();
        upload(imageUploadDto, memberEmail);

        return new MyUserDetails(memberEntity, attributes);
}
===========================================
````
![oauth2 0 yml 설정파일](https://github.com/songwc3/1stTeamProject/assets/133622405/fc8fdc24-3a02-4a86-a39e-bd629d85eaef)

</details>

<br/>

#### 회원 CRUD
<details>
<summary>상세보기</summary>

<br/>

- 회원가입

![회원가입창](https://github.com/songwc3/1stTeamProject/assets/133622405/e86bafb6-1815-4cba-9863-a40708efcb7f)
일반회원 entity와 간편회원 entity로 나누어 사용자가 원하는 회원유형에 대한 가입을 진행합니다. <br/><br/>

![회원가입 유효성 검사](https://github.com/songwc3/1stTeamProject/assets/133622405/72d13494-2c4f-4f73-9b2f-3652f7407ee3)
@Vaild와 BindingResult를 통해 설정 필드에 대한 유효성 검증을 진행하고 <br/>
우편번호 API를 통해 주소값을 입력받습니다.
<br/><br/>

````
// =============Controller===============
@GetMapping("/join")
    public String getJoin(MemberDto memberDto, Model model){

    // 연도, 월, 일 데이터를 모델에 추가하여 뷰로 전달
    List<Integer> birthYears = new ArrayList<>();
    for (int year = 2023; year >= 1900; year--) { // 2023부터 1900까지 역순으로 추가
        birthYears.add(year);
    }
    List<Integer> birthMonths = new ArrayList<>();
    for (int month = 1; month <= 12; month++) {
        birthMonths.add(month);
    }
    List<Integer> birthDays = new ArrayList<>();
    for (int day = 1; day <= 31; day++) {
        birthDays.add(day);
    }

    model.addAttribute("birthYears", birthYears);
    model.addAttribute("birthMonths", birthMonths);
    model.addAttribute("birthDays", birthDays);

    return "member/join";
}

@PostMapping("/join")
public String postJoin(@Valid @ModelAttribute MemberDto memberDto, BindingResult bindingResult){

    if (bindingResult.hasErrors()) {
        return "member/join";
    }
    // 비밀번호 일치 확인
    if (!memberDto.getMemberPassword().equals(memberDto.getConfirmPassword())) {
        bindingResult.rejectValue("confirmPassword", "error.confirmPassword", "비밀번호가 일치하지않습니다");
        return "member/join";
    }

    // 생년월일 정보를 조합하여 하나의 문자열로 만듭니다.
    String birthDate = String.format("%04d%02d%02d", memberDto.getBirthYear(), memberDto.getBirthMonth(), memberDto.getBirthDay());

    // MemberDto에 생년월일을 설정합니다.
    memberDto.setMemberBirth(birthDate);

    memberService.insertMember(memberDto);
    return "login";
}

// ==================Service===================
@Transactional
    public void insertMember(MemberDto memberDto) {

    MemberEntity memberEntity = MemberEntity.toMemberEntityInsert(memberDto, passwordEncoder);
    Long memberId = memberRepository.save(memberEntity).getMemberId();

    // 이미지 생성 및 저장
    ImageEntity imageEntity = new ImageEntity();
    imageEntity.setImageUrl("/profileImages/default.png");
    imageEntity.setMember(memberEntity);

    // ImageEntity를 db에 저장
    imageRepository.save(imageEntity);

    // 회원가입 이후 장바구니 생성
    createCartForMember(memberId);
}

// 장바구니 생성 메서드
private void createCartForMember(Long memberId) {
    MemberEntity memberEntity = memberRepository.findById(memberId).orElseThrow(IllegalAccessError::new);
    CartEntity cart = CartEntity.createCart(memberEntity);
    cartRepository.save(cart);
}

// =================Entity=================
public static MemberEntity toMemberEntityInsert(MemberDto memberDto, PasswordEncoder passwordEncoder) {

    MemberEntity memberEntity=new MemberEntity();

    memberEntity.setMemberEmail(memberDto.getMemberEmail());
    memberEntity.setMemberPassword(passwordEncoder.encode(memberDto.getMemberPassword()));
    memberEntity.setMemberName(memberDto.getMemberName());
    memberEntity.setMemberNickName(memberDto.getMemberNickName());
    memberEntity.setMemberPhone(memberDto.getMemberPhone());
    memberEntity.setMemberBirth(memberDto.getMemberBirth());
    memberEntity.setMemberPostCode(memberDto.getMemberPostCode());
    memberEntity.setMemberStreetAddress(memberDto.getMemberStreetAddress());
    memberEntity.setMemberDetailAddress(memberDto.getMemberDetailAddress());
    memberEntity.setRole(Role.MEMBER);

    return memberEntity;
}
// ====================주소 api==============================
function execPostCode() {
 new daum.Postcode({
     oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
        var jibunAddr = data.jibunAddress; // 지번 주소 변수
        var extraRoadAddr = ''; // 도로명 조합형 주소 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if(data.buildingName !== '' && data.apartment === 'Y'){
           extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if(extraRoadAddr !== ''){
            extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
        if(fullRoadAddr !== ''){
            fullRoadAddr += extraRoadAddr;
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        console.log(data.zonecode);
        console.log(fullRoadAddr);
        console.log(jibunAddr);

        $("[name=memberPostCode]").val(data.zonecode);
        $("[name=memberStreetAddress]").val(fullRoadAddr);

        document.getElementById('memberPostCode').value = data.zonecode; //5자리 새우편번호 사용
        document.getElementById('memberStreetAddress').value = fullRoadAddr;
    }
 }).open();
}
````
<br/>

- 회원목록 조회 및 회원 상세보기

![회원목록](https://github.com/songwc3/1stTeamProject/assets/133622405/bf9f5692-8436-4b4d-898b-a9a1f09fd4fc)
Pageble 객체를 통해 페이징 정보를 받고 검색조건(subject)과 검색어(search)를 받아 <br/> 
페이징과 검색이 가능한 회원 목록을 조회합니다. <br/><br/>

![회원상세정보](https://github.com/songwc3/1stTeamProject/assets/133622405/3df19e8a-98fe-408b-9a19-55d41a78f442)

회원 고유번호(memberId)로 해당 회원이 있는지 DB에서 조회 후, 해당 회원이 있으면 저장된 회원의 정보를 나타냅니다. <br/>
<br/><br/>

````
// controller
@GetMapping("/detail/{memberId}")
    public String getDetail(@PathVariable("memberId") Long memberId, Model model){

    MemberDto member=memberService.detailMember(memberId);
    // 이미지 url을 db에서 가져오기
    String memberImageUrl = imageService.findImage(member.getMemberEmail()).getImageUrl();

    model.addAttribute("member", member);
    model.addAttribute("memberImageUrl", memberImageUrl);

    return "member/detail";
}

// service
public MemberDto detailMember(Long memberId) {

    Optional<MemberEntity> optionalMemberEntity = Optional.ofNullable(memberRepository.findById(memberId).orElseThrow(() -> {
        return new IllegalArgumentException("조회할 아이디가 없습니다");
    }));

    if (optionalMemberEntity.isPresent()) {
        ImageEntity imageEntity = optionalMemberEntity.get().getImage();
        return MemberDto.toMemberDto(optionalMemberEntity.get());
    }
    return null;
}

// Dto
public static MemberDto toMemberDto(MemberEntity memberEntity) {
        MemberDto memberDto=new MemberDto();
        memberDto.setMemberId(memberEntity.getMemberId());
        memberDto.setMemberEmail(memberEntity.getMemberEmail());
        memberDto.setMemberPassword(memberEntity.getMemberPassword());
        memberDto.setMemberName(memberEntity.getMemberName());
        memberDto.setMemberNickName(memberEntity.getMemberNickName());
        memberDto.setMemberPhone(memberEntity.getMemberPhone());
        memberDto.setMemberBirth(memberEntity.getMemberBirth());
        memberDto.setMemberPostCode(memberEntity.getMemberPostCode());
        memberDto.setMemberStreetAddress(memberEntity.getMemberStreetAddress());
        memberDto.setMemberDetailAddress(memberEntity.getMemberDetailAddress());
        memberDto.setRole(memberEntity.getRole());
        memberDto.setCreateTime(memberEntity.getCreateTime());
        memberDto.setUpdateTime(memberEntity.getUpdateTime());

        memberDto.setImageUrl(memberEntity.getImage().getImageUrl());

        return memberDto;
}
````
<br/>

- 회원정보 수정

![회원정보 수정](https://github.com/songwc3/1stTeamProject/assets/133622405/e9c73c17-efb7-4124-ad09-42c7aab6d6f7)
회원 고유번호(memberId)로 해당 회원이 있는지 DB에서 조회하고, 있으면 수정된 entity 객체를 DB에 저장합니다.
<br/><br/>

````
// controller
@PostMapping("/update")
public String postUpdate(@Valid MemberDto memberDto, BindingResult bindingResult, @AuthenticationPrincipal MyUserDetails myUserDetails) {

    if (bindingResult.hasErrors()) {
        System.out.println("유효성 검증 관련 오류 발생");
        return "redirect:/";
    }

    // 생년월일 정보를 조합하여 하나의 문자열로 만듭니다.
    String birthDate = String.format("%04d%02d%02d", memberDto.getBirthYear(), memberDto.getBirthMonth(), memberDto.getBirthDay());

    // MemberDto에 생년월일을 설정합니다.
    memberDto.setMemberBirth(birthDate);

    int rs = memberService.updateMember(memberDto);

    if (rs == 1) {
       return "redirect:/member/detail/" + memberDto.getMemberId();
    } else {
        return "redirect:/";
    }
}

// service
 public MemberDto updateViewMember(Long memberId) {

    MemberEntity memberEntity = memberRepository.findById(memberId).orElseThrow(IllegalAccessError::new);
    return MemberDto.toMemberDto(memberEntity);
}

@Transactional
public int updateMember(MemberDto memberDto) {

    Optional<MemberEntity> optionalMemberEntity = Optional.ofNullable(memberRepository.findById(memberDto.getMemberId()).orElseThrow(() -> {
        return new IllegalArgumentException("수정할 아이디가 없습니다");
    }));

    MemberEntity memberEntity = MemberEntity.toMemberEntityUpdate(memberDto);
    Long memberId = memberRepository.save(memberEntity).getMemberId();

    Optional<MemberEntity> optionalMemberEntity1 = Optional.ofNullable(memberRepository.findById(memberId).orElseThrow(() -> {
        return new IllegalArgumentException("수정할 아이디가 없습니다");
    }));

    if (optionalMemberEntity1.isPresent()) {
        System.out.println("회원정보 수정 성공");
        return 1;

    } else {
        System.out.println("회원정보 수정 실패");
        return 0;
    }
}

// entity
public static MemberEntity toMemberEntityUpdate(MemberDto memberDto) {

    MemberEntity memberEntity=new MemberEntity();

    memberEntity.setMemberId(memberDto.getMemberId());
    memberEntity.setMemberEmail(memberDto.getMemberEmail());
    memberEntity.setMemberPassword(memberDto.getMemberPassword());
    memberEntity.setMemberName(memberDto.getMemberName());
    memberEntity.setMemberNickName(memberDto.getMemberNickName());
    memberEntity.setMemberPhone(memberDto.getMemberPhone());
    memberEntity.setMemberBirth(memberDto.getMemberBirth());
    memberEntity.setMemberPostCode(memberDto.getMemberPostCode());
    memberEntity.setMemberStreetAddress(memberDto.getMemberStreetAddress());
    memberEntity.setMemberDetailAddress(memberDto.getMemberDetailAddress());
    memberEntity.setRole(memberDto.getRole());
    memberEntity.setCreateTime(memberDto.getCreateTime());
    memberEntity.setUpdateTime(memberDto.getUpdateTime());

    return memberEntity;
}
````
<br/>

- 회원정보 삭제

![회원정보 삭제](https://github.com/songwc3/1stTeamProject/assets/133622405/1ca53323-dba7-4a54-9620-de926ffdb1d6)
delete 메서드를 이용해 회원 정보를 삭제합니다. 삭제 후 authentication 객체가 없다면 Context를 비우고 로그아웃 처리합니다.
<br/><br/>

````
// controller
@GetMapping("/delete/{memberId}")
public String getDelete(@PathVariable("memberId") Long memberId){

    int rs=memberService.deleteMember(memberId);

    if (rs==1) {
        System.out.println("회원정보 삭제 성공");

        // 회원정보 삭제 후 로그아웃 처리
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null) {
            SecurityContextHolder.clearContext();
        }
        return "redirect:/";

    }else{
        System.out.println("회원정보 삭제 실패");
        return "redirect:/";
    }
}

// service
@Transactional
public int deleteMember(Long memberId) {

    Optional<MemberEntity> optionalMemberEntity = Optional.ofNullable(memberRepository.findById(memberId).orElseThrow(() -> {
        return new IllegalArgumentException("삭제할 아이디가 없습니다");
    }));

    memberRepository.delete(optionalMemberEntity.get());

    Optional<MemberEntity> optionalMemberEntity1 = memberRepository.findById(memberId);

    if (!optionalMemberEntity1.isPresent()) {
        return 1;
    } else {
        return 0;
    }
}
````
<br/>



</details>

<br/>

#### 이메일 인증, 비밀번호 찾기를 통한 임시비밀번호 발급
<details>
<summary>상세보기</summary>

<br/>

- 이메일 인증
  ![이메일 인증](https://github.com/songwc3/1stTeamProject/assets/133622405/db759543-206d-4192-bfb9-b0df107b3c80)
ajax를 통해 클라이언트가 post 요청을 보내고, 입력 받은 이메일 주소로 <br/>
createCode 메서드를 통해 생성된 인증코드를 반환합니다. <br/>
이메일 내용은 setContext 메서드를 이용해 Thymeleaf 템플릿 엔진을 사용하여 HTML 템플릿을 적용합니다. <br/><br/>

- 비밀번호 인증
!![임시비밀번호발급](https://github.com/songwc3/1stTeamProject/assets/133622405/813d6838-4034-40a6-890a-1e2f74ac5b4b)
이메일 인증과 마찬가지로 이메일 주소를 입력 받아 임시비밀번호를 생성하여 <br/>
DB에 저장하고 해당 이메일로 전송합니다.
<br/><br/>

````
// controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/send-mail")
public class EmailController {

    private final EmailService emailService;

    // 임시 비밀번호 발급
    @PostMapping("/password")
    public ResponseEntity postSendPasswordMail(@RequestBody EmailPostDto emailPostDto) {
        EmailMessageEntity emailMessageEntity = EmailMessageEntity.builder()
                .to(emailPostDto.getEmail())
                .subject("<<SWC_test>> 임시 비밀번호 발급")
                .build();

        emailService.sendMail(emailMessageEntity, "password");
        
        return ResponseEntity.ok("{}"); // 빈 JSON 객체 반환, 클라이언트에서 JSON 파싱 오류를 피하기 위해 빈 JSON 객체로 응답을 반환하는 것이 일반적
    }

    // 회원가입 이메일 인증 - 요청 시 body로 인증번호 반환하도록 작성하였음
    @PostMapping("/email")
    public ResponseEntity postSendJoinMail(@RequestBody EmailPostDto emailPostDto) {
        EmailMessageEntity emailMessageEntity = EmailMessageEntity.builder()
                .to(emailPostDto.getEmail())
                .subject("<<SWC_test>> 이메일 인증을 위한 인증 코드 발송")
                .build();

        String code = emailService.sendMail(emailMessageEntity, "email");

        EmailResponseDto emailResponseDto = new EmailResponseDto();
        emailResponseDto.setCode(code);

        return ResponseEntity.ok(emailResponseDto);
    }
}

// service
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

private final JavaMailSender javaMailSender;
private final SpringTemplateEngine templateEngine;
private final MemberService memberService;
private final MemberRepository memberRepository;

public String sendMail(EmailMessageEntity emailMessageEntity, String type) {

    String authNum = createCode(); // 인증번호, 인증번호가 생성되면 해당 번호를 'authNum'에 저장하여 이메일 내용에 삽입하거나 임시비밀번호로 설정함

    MimeMessage mimeMessage = javaMailSender.createMimeMessage();

    // 임시비밀번호 전송이 아닌 경우는 여기서 검사할 필요가 없습니다.
    if (type.equals("password")) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByMemberEmail(emailMessageEntity.getTo());
        if (!optionalMemberEntity.isPresent()) {
            log.error("해당 이메일을 가진 회원을 찾을 수 없습니다: {}", emailMessageEntity.getTo());
            throw new RuntimeException("해당 이메일을 가진 회원을 찾을 수 없습니다.");
        }
        memberService.SetTempPassword(emailMessageEntity.getTo(), authNum); // 임시비밀번호 저장
    }

    try {
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
        mimeMessageHelper.setTo(emailMessageEntity.getTo()); // 메일 수신자
        mimeMessageHelper.setSubject(emailMessageEntity.getSubject()); // 메일 제목
        mimeMessageHelper.setText(setContext(authNum, type), true); // 메일 본문 내용, HTML 여부
        javaMailSender.send(mimeMessage);

        log.info("success");

        return authNum;

    } catch (MessagingException e) {
        log.info("fail");
        throw new RuntimeException(e);
    }
}

    // 인증번호 및 임시 비밀번호 생성 메서드
    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0: key.append((char) ((int) random.nextInt(26) + 97)); break;
                case 1: key.append((char) ((int) random.nextInt(26) + 65)); break;
                default: key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }

    // thymeleaf를 통한 html 적용
    public String setContext(String code, String type) {
        Context context = new Context();
        context.setVariable("code", code);
        return templateEngine.process(type, context);
    }
}

// html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<body>
<div style="margin:100px;">
    <h1> 안녕하세요.</h1>
    <h1> SWC_test 이메일 인증번호입니다.</h1>
    <br>
    <p> 아래 코드를 회원가입 창으로 돌아가 입력해주세요.</p>
    <br>

    <div align="center" style="border:1px solid black; font-family:verdana;">
        <h3 style="color:blue"> 회원가입 인증 코드 입니다. </h3>
        <div style="font-size:130%" th:text="${code}"> </div>
    </div>
    <br/>
</div>
</body>
</html>

<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<body>
<div style="margin:100px;">
    <h1> 안녕하세요.</h1>
    <h1> SWC_test 임시비밀번호입니다.</h1>
    <br>
    <p> 임시 비밀번호를 발급드립니다. 아래 발급된 비밀번호로 로그인해주세요. </p>
    <br>

    <div align="center" style="border:1px solid black; font-family:verdana;">
        <h3 style="color:blue"> 임시 비밀번호 입니다. </h3>
        <div style="font-size:130%" th:text="${code}"> </div>
    </div>
    <br/>
</div>
</body>
</html>

// ===========이메일==============
// js
$.ajax({
    type: "POST",
    url: "/send-mail/email",
    data: JSON.stringify({ email: email }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(response) {
        sentVerificationCode = response.code; // 서버에서 전송한 인증번호 저장
        $("#certifyEmailMessage").text("이메일로 인증번호가 전송되었습니다.").show();
        isVerified = false; // 인증번호 확인 여부 초기화
    },
    error: function() {
        $("#certifyEmailMessage").text("이메일 인증번호 전송에 실패했습니다.").show();
    }

// ===========비밀번호==============
$.ajax({
    type: "POST",
    url: "/send-mail/password",
    data: JSON.stringify({ email: email, phone: phone }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(response) {
        console.log(response);
        $("#tempPasswordMessage").text("해당 이메일로 임시비밀번호가 전송되었습니다.").show();
    },
    error: function(xhr, textStatus, errorThrown) {
        alert("이메일 임시비밀번호 전송에 실패했습니다.");
    }
});

// yml 설정
  mail:
    # google smtp server 사용
    host: smtp.gmail.com
    port: 587
    username: songwc333@gmail.com
    password: # 앱비밀번호 입력
    properties: # 이메일 구성에 대한 추가 속성
      mail:
        smtp:
          auth: true # SMTP 서버에 인증 필요한 경우 true로 지정한다. Gmail SMTP 서버는 인증을 요구하기 때문에 true로 설정해야 한다.
          connectiontimeout: 5000 # 클라이언트가 SMTP 서버와의 연결을 설정하는 데 대기해야 하는 시간(Millisecond). 연결이 불안정한 경우 대기 시간이 길어질 수 있기 때문에 너무 크게 설정하면 전송 속도가 느려질 수 있다.
          timeout: 5000 # 클라이언트가 SMTP 서버로부터 응답을 대기해야 하는 시간(Millisecond). 서버에서 응답이 오지 않는 경우 대기 시간을 제한하기 위해 사용된다.
          writetimeout: 5000 # 클라이언트가 작업을 완료하는데 대기해야 하는 시간(Millisecond). 이메일을 SMTP 서버로 전송하는 데 걸리는 시간을 제한하는데 사용된다.
          starttls: # SMTP 서버가 TLS를 사용하여 안전한 연결을 요구하는 경우 true로 설정한다. TLS는 데이터를 암호화하여 안전한 전송을 보장하는 프로토콜이다.
            enable: true
            required: true
          ssl:
            trust: smtp.gmail.com
            protocols: TLSv1.2

    auth-code-expiration-millis: 1800000 # 30*60*1000 = 30분
````

</details>

<br/>

#### 장바구니
<details>
<summary>상세보기</summary>

<br/>

- 장바구니 담기 <br/>

![장바구니 담기 전 페이지](https://github.com/songwc3/1stTeamProject/assets/133622405/e637d12b-7048-4c2e-90da-56ce6d49e718)
수량 설정 후 장바구니 추가버튼을 누르게 되면, 회원 정보와 상품 정보, 수량을 addCart 메서드에 전달합니다. <br/>
이후 해당 상품이 장바구니에 존재하지않으면 상품 추가를 하고 해당 상품이 존재하면 설정한 수량만 증가시킵니다. <br/><br/>
````
// controller
@PostMapping("/member/{memberId}/{id}")
public String postAddCartItem(@PathVariable("memberId") Long memberId,
                              @PathVariable("id") Long productId, int amount){

    MemberEntity member=memberService.findMember(memberId);
    ProductEntity product=productService.productView(productId);

    cartService.addCart(member, product, amount);
    log.info("amount : " + amount);

    return "redirect:/product/" + productId;
}

// service
@Transactional
public void addCart(MemberEntity member, ProductEntity newProduct, int amount){

    // memberId로 해당 member의 장바구니 찾기
    CartEntity cart=cartRepository.findByMember(member);

    // 장바구니가 존재하지않는다면
    if(cart==null){
        cart=cart.createCart(member);
        cartRepository.save(cart);
    }
    ProductEntity product=productRepository.findProductById(newProduct.getId());
    CartItemEntity cartItem=cartItemRepository.findByCart_CartIdAndProduct_Id(cart.getCartId(), product.getId());

    // 상품이 장바구니에 존재하지않는다면 카트상품 생성 후 추가
    if (cartItem==null) {
        cartItem=CartItemEntity.createCartItem(cart, product, amount);
        cartItemRepository.save(cartItem);
        // 상품이 장바구니에 이미 존재한다면 수량만 증가
    }else {
        CartItemEntity update=cartItem;
        update.setCart(cartItem.getCart());
        update.setProduct(cartItem.getProduct());
        update.addCount(amount);
        update.setCartItemCount(update.getCartItemCount());
        cartItemRepository.save(update);
    }
    // 카트 상품 총 개수 증가
    cart.setCartCount(cart.getCartCount()+amount);
}
````
<br/>

- 장바구니 페이지 <br/>

![장바구니 페이지](https://github.com/songwc3/1stTeamProject/assets/133622405/4135f9e7-7ddd-400c-8bb1-c5dff5c0aa3d)
myUserDetails 객체를 이용해 로그인한 사용자의 정보를 memberID를 통해 확인하고 일치한다면 <br/>
해당 회원의 장바구니 상품을 포함한 장바구니 정보를 가져옵니다. <br/><br/>
````
// controller
@GetMapping("/member/{memberId}")
public String getCartView(@PathVariable("memberId") Long memberId, Model model,
                          @AuthenticationPrincipal MyUserDetails myUserDetails){
    // 로그인 되어있는 유저의 id와 장바구니에 접속하는 id가 같아야함
    if (myUserDetails.getMemberEntity().getMemberId()==memberId) {

        // 프로필 이미지 불러옴
        MemberEntity member=memberService.findMember(memberId);
        String memberImageUrl = imageService.findImage(member.getMemberEmail()).getImageUrl();

        // 로그인 되어있는 유저에 해당하는 장바구니 가져오기
        CartEntity memberCart=member.getCart();

        // 장바구니에 들어있는 상품 모두 가져오기
        List<CartItemEntity> cartItemEntityList=cartService.allMemberCartView(memberCart);

        // 장바구니에 들어있는 상품들의 총 가격
        int totalPrice=0;
        for(CartItemEntity cartItem: cartItemEntityList){
            totalPrice += cartItem.getCartItemCount() * cartItem.getProduct().getProductPrice();
        }

        // 상품 이미지를 가져와서 모델에 추가
        List<ProductImgDTO> productImages = new ArrayList<>();
        List<ProductEntity> productEntities = new ArrayList<ProductEntity>();
        for (CartItemEntity cartItem : cartItemEntityList) {
            Long productId = cartItem.getProduct().getId();
            productEntities.add(productService.productView(productId));
            List<ProductImgDTO> productImgs = productUtilService.getProductImagesByProductId(productId);
            productImages.addAll(productImgs);
        }

        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("totalCount", memberCart.getCartCount());
        model.addAttribute("cartItems", cartItemEntityList);
        model.addAttribute("member", memberService.findMember(memberId));
        model.addAttribute("productImages", productImages);
        model.addAttribute("memberImageUrl", memberImageUrl); // 프로필 이미지 불러옴

        return "member/cart";

    }else {
        // 로그인 id와 장바구니 접속 id가 같지 않은 경우
        return "redirect:/";
    }
}

// service
public List<CartItemEntity> allMemberCartView(CartEntity memberCart) {

    // 멤버의 카트 id를 꺼냄
    Long memberCartId=memberCart.getCartId();

    // id에 해당하는 멤버가 담은 상품을 넣어둘 곳
    List<CartItemEntity> memberCartItems=new ArrayList<>();

    // 멤버 상관없이 카트에 있는 상품 모두 불러오기
    List<CartItemEntity> cartItems=cartItemRepository.findAll();

    for (CartItemEntity cartItem: cartItems){
        if (cartItem.getCart().getCartId() == memberCartId) {
            memberCartItems.add(cartItem);
        }
    }
    return memberCartItems;
}
````
<br/>

- 장바구니상품 삭제 <br/>
장바구니 담기와 마찬가지로 myUserDetails 객체를 이용해 현재 로그인한 사용자가 맞는지 조회하고 <br/>
cartItemId를 사용해 삭제할 장바구니상품을 찾은 후 해당 상품을 삭제하는 cartItemDelete 메서드를 실행합니다. <br/>
이후 장바구니에 담긴 상품들의 총 가격을 계산하고 총 수량에서 삭제한 수량을 감소시킵니다. <br/><br/>
````
// controller
@GetMapping("/member/{memberId}/{cartItemId}/delete")
public String getDeleteCartItem(@PathVariable("memberId") Long memberId,
                                @PathVariable("cartItemId") Long cartItemId, Model model,
                                @AuthenticationPrincipal MyUserDetails myUserDetails){

    // 로그인 멤버 id와 장바구니 멤버 id가 같아야함
    if (myUserDetails.getMemberEntity().getMemberId() == memberId) {
        // cartItemId로 장바구니 상품 찾기
        CartItemEntity cartItem=cartService.findCartItemById(cartItemId);

        // 장바구니 물건 삭제
        cartService.cartItemDelete(cartItemId);

        // 해당 멤버의 카트 찾기
        CartEntity memberCart=cartService.findMemberCart(memberId);

        // 해당 멤버의 장바구니 상품들
        List<CartItemEntity> cartItemEntityList=cartService.allMemberCartView(memberCart);

        // 총 가격 += 수량*가격
        int totalPrice=0;
        for(CartItemEntity cartItem1: cartItemEntityList){
            totalPrice += cartItem1.getCartItemCount() * cartItem1.getProduct().getProductPrice();
        }

        memberCart.setCartCount(memberCart.getCartCount() - cartItem.getCartItemCount());

        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("totalCount", memberCart.getCartCount());
        model.addAttribute("cartItems", cartItemEntityList);
        model.addAttribute("member", memberService.findMember(memberId));

        return "redirect:/cart/member/" + myUserDetails.getMemberEntity().getMemberId();

    }else {
        // 로그인id와 장바구니 삭제하려는 멤버id가 같지 않은 경우
        return "redirect:/";
    }
}

// service
public void cartItemDelete(Long cartItemId){
    CartItemEntity cartItem = cartItemRepository.findById(cartItemId).orElseThrow(IllegalAccessError::new);
    if (cartItem != null) {
        cartItem.setCart(null); // cart와의 관계 끊기
        cartItemRepository.save(cartItem); // 변경 내용 저장
        cartItemRepository.deleteById(cartItemId); // cartItem 삭제
    }
}
````
<br/>

- 장바구니 작동 영상

![장바구니](https://github.com/songwc3/1stTeamProject/assets/133622405/e2882f31-6c60-4c4b-b084-47e0c5702204)
</details>

<br/>

#### CI/CD(일단 보류)
<details>
<summary>상세보기</summary>

<br/>


</details>

<br/>

#### 네이버 워크플레이스(조직도, 결재, 드라이브)
<details>
<summary>상세보기</summary>

<br/>

- 조직도 설정 <br/><br/>

![조직도 캡처1](https://github.com/songwc3/1stTeamProject/assets/133622405/5680a3d5-ccda-47dd-933f-72d8d8b42860) <br/>
네이버 워크플레이스에 들어가 관리자 메뉴에서 구성원을 누르고 <br/><br/>
![조직도 캡처2](https://github.com/songwc3/1stTeamProject/assets/133622405/2963121f-e94f-45ae-bb48-0ade3a66d84d)
조직도 관리에서 '+' 버튼을 누릅니다. <br/><br/>
![조직도 캡처3](https://github.com/songwc3/1stTeamProject/assets/133622405/7bb59f7b-c2cf-4bf5-a9e9-c963ceca6d9a)
원하는 부서를 추가합니다. '↑', '↓' 버튼을 통해 상위 부서, 하위 부서를 설정할수있습니다. <br/><br/>
![조직도 캡처4](https://github.com/songwc3/1stTeamProject/assets/133622405/c6e7d3a8-b7a4-4a47-b99c-6d26a97ad497) <br/>
조직도 설정을 마친 후 구성원에서 Admin을 누르고 <br/><br/>
![조직도5](https://github.com/songwc3/1stTeamProject/assets/133622405/f740c851-be2a-4413-bcd8-56a9bc879a94)
회사정보탭에서 회사 정보 관리를 눌러 회사 정보들을 기입합니다. <br/><br/>
![조직도6](https://github.com/songwc3/1stTeamProject/assets/133622405/4e86b265-628b-44da-bed5-5c4c6f6087eb)
사업장 관리를 눌러 사업장에 들어갑니다. <br/><br/>
![조직도7](https://github.com/songwc3/1stTeamProject/assets/133622405/ba52c0e5-1156-4627-b75b-06a5acac2b9d)
사업장 정보들을 기입합니다. <br/><br/>
![조직도8](https://github.com/songwc3/1stTeamProject/assets/133622405/38205387-b784-424b-9cb8-fa2f73abcc9f) <br/>
이후 사원 관리를 누르고 추가 버튼을 누릅니다. <br/><br/>
![조직도9](https://github.com/songwc3/1stTeamProject/assets/133622405/43e0ff09-a6a8-4cdc-8022-b8dfb74770c4)
사원 정보들을 기입하고 사원을 등록합니다. <br/><br/>


- 결재 설정 <br/><br/>

![결재1](https://github.com/songwc3/1stTeamProject/assets/133622405/b87e606f-151a-4586-9136-be7d7eafd80d) <br/>
상단의 결재 버튼을 클릭합니다. <br/><br/>
![결재2](https://github.com/songwc3/1stTeamProject/assets/133622405/ff159635-4adc-44a1-86d0-2fe360375068)
문서 작성탭에 들어가 '일반 기안지' 서식은 선택합니다. <br/><br/>
![결재3](https://github.com/songwc3/1stTeamProject/assets/133622405/988d807d-7d50-4a21-ae3e-6f17e8dc79c6)
제목과 내용을 입력 후 오른쪽의 결재선 설정을 클릭합니다. <br/><br/>
![결재4](https://github.com/songwc3/1stTeamProject/assets/133622405/dbc3217a-55ea-4bd2-a3b3-a9fb408701ca)
추가를 누르고 결재를 요청할 수신자를 선택합니다. <br/><br/>
![결재5](https://github.com/songwc3/1stTeamProject/assets/133622405/17007a72-190c-449a-9792-56b7ff176ca2)
하단 상신 버튼을 클릭합니다. <br/><br/>
![결재6](https://github.com/songwc3/1stTeamProject/assets/133622405/a4c9036f-93ec-4520-a97b-4fe888f7c734)
작성한 내용이 맞는지 확인합니다. <br/><br/>
![결재7](https://github.com/songwc3/1stTeamProject/assets/133622405/4224b3c9-6c3c-4665-bbd2-32f393734812)
수신자로 전환해 왼쪽 사이드바에서 대기를 누릅니다. <br/><br/>
![결재8](https://github.com/songwc3/1stTeamProject/assets/133622405/2a02ae80-091f-45a6-982c-577d0e5f75cb)
대기 메뉴에 등록한 문서가 있는지 확인합니다. <br/><br/>
![결재9](https://github.com/songwc3/1stTeamProject/assets/133622405/ec0d634f-8174-4c60-ab61-3d13b77ec86f) <br/>
대기중인 문서에 들어가 내용을 확인 후 승인 버튼을 누릅니다. <br/><br/>
![결재10](https://github.com/songwc3/1stTeamProject/assets/133622405/671e0ff1-c2a0-4d70-b627-0a6b8c405006) <br/>
위 사진과 같이 결재가 된것을 확인할수있습니다. <br/><br/>

- 드라이브 설정 <br/><br/>

![드라이브1](https://github.com/songwc3/1stTeamProject/assets/133622405/82cf9839-03cd-4b0a-94b6-d00473f85e5e)
우측 상단 메뉴서식검색, 전체메뉴를 눌러 드라이브를 클릭합니다. <br/><br/>
![드라이브2](https://github.com/songwc3/1stTeamProject/assets/133622405/c54c9cec-fbe6-4355-85e8-bba779f7d75c) <br/>
파일 올리기를 클릭하고 올릴 파일을 선택합니다. <br/><br/>
![드라이브3](https://github.com/songwc3/1stTeamProject/assets/133622405/cc74b708-f0bb-4ab4-84b7-b1ab5d98a3f5) <br/>
파일을 저장할 경로를 지정합니다. <br/><br/>
![드라이브4](https://github.com/songwc3/1stTeamProject/assets/133622405/0c146b88-6083-44b9-af74-f7d45b967829)
 <br/>
파일이 지정한 경로에 저장된 것을 확인할수있습니다. <br/><br/>

</details>

<br/>

팀장 이** : DB 관리, 상품 결제 기능, 메인 페이지, 관리자 페이지, CI/CD <br/>
팀원 김** : 게시판 CRUD(공지사항, 문의사항), 페이지 및 챗봇 CSS, PPT 작성 <br/>
팀원 박** : 상품 CRUD, 상품 CSS, 네이버 워크플레이스 <br/>
팀원 방** : 문의사항 답변, 상품 후기, 챗봇 기능 구현


