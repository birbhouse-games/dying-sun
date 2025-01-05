<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.11.0" name="props" tilewidth="80" tileheight="64" tilecount="43" columns="0">
 <grid orientation="orthogonal" width="1" height="1"/>
 <tile id="0">
  <properties>
   <property name="zOffset" type="int" value="47"/>
  </properties>
  <image source="props/banner.png" width="32" height="48"/>
  <objectgroup draworder="index" id="2">
   <object id="2" x="29" y="48" width="1"/>
   <object id="4" type="collider" x="19" y="46" width="1" height="1">
    <properties>
     <property name="isRigid" type="bool" value="true"/>
    </properties>
   </object>
   <object id="5" type="collider" x="31" y="27" width="1" height="1">
    <properties>
     <property name="isRigid" type="bool" value="true"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="1">
  <properties>
   <property name="zOffset" type="int" value="28"/>
  </properties>
  <image source="props/charging-station.png" width="64" height="32"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="13" y="23" width="34" height="5">
    <properties>
     <property name="isRigid" type="bool" value="true"/>
    </properties>
   </object>
   <object id="2" x="62" y="27" width="1" height="1">
    <properties>
     <property name="isRigid" type="bool" value="true"/>
    </properties>
   </object>
   <object id="3" type="collider" x="17" y="28" width="4" height="2"/>
  </objectgroup>
 </tile>
 <tile id="2">
  <properties>
   <property name="zOffset" type="int" value="12"/>
  </properties>
  <image source="props/contaminated-grass-1.png" width="16" height="16"/>
 </tile>
 <tile id="3">
  <properties>
   <property name="zOffset" type="int" value="13"/>
  </properties>
  <image source="props/contaminated-grass-2.png" width="16" height="16"/>
 </tile>
 <tile id="4">
  <properties>
   <property name="zOffset" type="int" value="15"/>
  </properties>
  <image source="props/crop.png" width="16" height="16"/>
 </tile>
 <tile id="5">
  <properties>
   <property name="zOffset" type="int" value="46"/>
  </properties>
  <image source="props/decorated-double-light-off.png" width="48" height="48"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="30" y="45" width="2" height="1"/>
  </objectgroup>
 </tile>
 <tile id="6">
  <image source="props/decorated-double-light-on.png" width="48" height="48"/>
 </tile>
 <tile id="7">
  <properties>
   <property name="zOffset" type="int" value="31"/>
  </properties>
  <image source="props/double-light-off.png" width="32" height="32"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="23" y="31" width="2" height="1"/>
  </objectgroup>
 </tile>
 <tile id="8">
  <image source="props/double-light-on.png" width="32" height="32"/>
 </tile>
 <tile id="9">
  <image source="props/exploited-puddle.png" width="48" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="5" y="5" width="17" height="4"/>
   <object id="2" type="collider" x="7" y="0">
    <polygon points="0,0 -1,1 -1,3 0,5 15,9 25,10 28,10 37,7 40,5 40,3 37,0"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="10">
  <properties>
   <property name="zOffset" type="int" value="26"/>
  </properties>
  <image source="props/fenced-crop.png" width="64" height="32"/>
  <objectgroup draworder="index" id="5">
   <object id="4" type="collider" x="21" y="17">
    <polygon points="0,0 -9,8 -9,9 -8,9 1,1 29,1 36,8 37,8 37,7 30,0"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="11">
  <properties>
   <property name="zOffset" type="int" value="13"/>
  </properties>
  <image source="props/grass-1.png" width="16" height="16"/>
 </tile>
 <tile id="12">
  <properties>
   <property name="zOffset" type="int" value="14"/>
  </properties>
  <image source="props/grass-2.png" width="16" height="16"/>
 </tile>
 <tile id="13">
  <properties>
   <property name="zOffset" type="int" value="13"/>
  </properties>
  <image source="props/grass-3.png" width="16" height="16"/>
 </tile>
 <tile id="14">
  <properties>
   <property name="zOffset" type="int" value="14"/>
  </properties>
  <image source="props/grass-4.png" width="16" height="16"/>
 </tile>
 <tile id="15">
  <properties>
   <property name="zOffset" type="int" value="14"/>
  </properties>
  <image source="props/gravestone.png" width="16" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="10" y="14" width="1" height="1"/>
  </objectgroup>
 </tile>
 <tile id="16">
  <properties>
   <property name="zOffset" type="int" value="14"/>
  </properties>
  <image source="props/large-gravestone.png" width="16" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="11" y="14" width="1" height="1"/>
  </objectgroup>
 </tile>
 <tile id="17">
  <properties>
   <property name="zOffset" type="int" value="28"/>
  </properties>
  <image source="props/leanto.png" width="48" height="32"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="13" y="11" width="1" height="1"/>
   <object id="2" type="collider" x="26" y="27" width="1" height="1"/>
   <object id="3" type="collider" x="44" y="13" width="1" height="1"/>
  </objectgroup>
 </tile>
 <tile id="18">
  <properties>
   <property name="zOffset" type="int" value="15"/>
  </properties>
  <image source="props/light-off.png" width="16" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="10" y="15" width="1" height="1"/>
  </objectgroup>
 </tile>
 <tile id="19">
  <image source="props/light-on.png" width="16" height="16"/>
 </tile>
 <tile id="20">
  <image source="props/light-spread.png" width="80" height="64"/>
 </tile>
 <tile id="21">
  <properties>
   <property name="zOffset" type="int" value="15"/>
  </properties>
  <image source="props/light-tower.png" width="64" height="64"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="41" y="63" width="2" height="1"/>
   <object id="2" type="collider" x="57" y="51" width="4" height="2"/>
  </objectgroup>
 </tile>
 <tile id="22">
  <properties>
   <property name="zOffset" type="int" value="15"/>
  </properties>
  <image source="props/plant-1.png" width="16" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="9" y="15" width="1" height="1"/>
  </objectgroup>
 </tile>
 <tile id="23">
  <properties>
   <property name="zOffset" type="int" value="15"/>
  </properties>
  <image source="props/plant-2.png" width="16" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="6" y="15" width="1" height="1"/>
  </objectgroup>
 </tile>
 <tile id="24">
  <properties>
   <property name="zOffset" type="int" value="15"/>
  </properties>
  <image source="props/plant-3.png" width="16" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="5" y="15" width="1" height="1"/>
  </objectgroup>
 </tile>
 <tile id="25">
  <image source="props/puddle.png" width="48" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="7" y="0">
    <polygon points="0,0 -1,1 -1,3 0,5 15,9 25,10 28,10 37,7 40,5 40,3 37,0"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="26">
  <properties>
   <property name="zOffset" type="int" value="11"/>
  </properties>
  <image source="props/ruined-pool.png" width="80" height="32"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="1" y="25">
    <polygon points="0,0 15,-15 75,-15 75,-13 61,1 0,1"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="27">
  <properties>
   <property name="zOffset" type="int" value="31"/>
  </properties>
  <image source="props/ruined-post.png" width="32" height="32"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="25" y="31" width="2" height="1"/>
  </objectgroup>
 </tile>
 <tile id="28">
  <properties>
   <property name="zOffset" type="int" value="12"/>
  </properties>
  <image source="props/ruined-wall.png" width="64" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="15" y="10" width="38" height="2">
    <properties>
     <property name="isRigid" type="bool" value="true"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
 <tile id="29">
  <image source="props/scrawl-back.png" width="48" height="16"/>
 </tile>
 <tile id="30">
  <image source="props/scrawl-food.png" width="64" height="16"/>
 </tile>
 <tile id="31">
  <image source="props/scrawl-h20.png" width="48" height="16"/>
 </tile>
 <tile id="32">
  <image source="props/scrawl-help.png" width="48" height="16"/>
 </tile>
 <tile id="33">
  <image source="props/scrawl-run.png" width="32" height="16"/>
 </tile>
 <tile id="34">
  <image source="props/scrawl-turn.png" width="48" height="16"/>
 </tile>
 <tile id="35">
  <properties>
   <property name="zOffset" type="int" value="26"/>
  </properties>
  <image source="props/shack.png" width="64" height="32"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="12" y="20" width="1" height="1"/>
   <object id="2" type="collider" x="33" y="26">
    <polygon points="0,0 20,0 24,-4 4,-4"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="36">
  <properties>
   <property name="zOffset" type="int" value="27"/>
  </properties>
  <image source="props/shipping-container.png" width="80" height="32"/>
  <objectgroup draworder="index" id="2">
   <object id="2" type="collider" x="68" y="27">
    <polygon points="0,0 5,-4 -40,-4 -46,0"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="37">
  <properties>
   <property name="zOffset" type="int" value="15"/>
  </properties>
  <image source="props/small-crate.png" width="16" height="16"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="5" y="16">
    <polygon points="0,0 9,0 11,-2 11,-3 2,-3 0,-1"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="38">
  <properties>
   <property name="zOffset" type="int" value="27"/>
  </properties>
  <image source="props/solar-panel.png" width="64" height="32"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="13" y="23" width="4" height="2"/>
   <object id="2" type="collider" x="23" y="25" width="2" height="2"/>
   <object id="3" type="collider" x="29" y="21.0008" width="2" height="2"/>
   <object id="4" type="collider" x="47" y="25" width="2" height="2"/>
   <object id="5" type="collider" x="51" y="21" width="2" height="2"/>
  </objectgroup>
 </tile>
 <tile id="39">
  <properties>
   <property name="zOffset" type="int" value="15"/>
  </properties>
  <image source="props/solar-tower.png" width="48" height="48"/>
  <objectgroup draworder="index" id="2">
   <object id="2" type="collider" x="28" y="46" width="13" height="2"/>
   <object id="3" type="collider" x="23" y="47">
    <polygon points="0,0 0,-1 3,-4 12,-4 12,-3 9,0"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="40">
  <image source="props/sun.png" width="48" height="48"/>
 </tile>
 <tile id="41">
  <properties>
   <property name="zOffset" type="int" value="33"/>
  </properties>
  <image source="props/water-tank.png" width="48" height="48"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="9" y="33">
    <polygon points="0,0 5,4 28,4 33,0 28,-4 5,-4"/>
   </object>
  </objectgroup>
 </tile>
 <tile id="42">
  <properties>
   <property name="zOffset" type="int" value="57"/>
  </properties>
  <image source="props/water-tower.png" width="64" height="64"/>
  <objectgroup draworder="index" id="2">
   <object id="1" type="collider" x="38" y="55">
    <polygon points="0,0 7,-4 9,-4 18,0 18,2 0,2"/>
   </object>
  </objectgroup>
 </tile>
</tileset>
