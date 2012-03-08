<form id="dialog_form" target="#" onsubmit="return false;">
        
           <fieldset title="1. Screen Name">
               <legend>Provide Screen information</legend>            
               <div class="wizard_content">
                 <label>Screen Name:</label>
                 <input type="text" id="addTable_alias" name="alias" value="">
                 <br>
				 <div id="addTable_alias_error" class="validateErrorContainer"></div>
  			  </div>
           </fieldset>
         
          <fieldset title="2. Screen Data">
               <legend>Select the data to use</legend>          
               <div class="wizard_content">
                 <label>Screen Data</label>
                 <select size="7" name="tablename" id="addTable_tablename" >
                    <?php
                    $i=0;
                    foreach ($tables as $table){
                    if($i==0)
                       echo '<option selected="true" value="'.$table->getName().'">'.$table->getName().'</option>';
                    else
                       echo '<option value="'.$table->getName().'">'.$table->getName().'</option>';
                    $i++;
                    }?>
                 </select>
                 <div id="addTable_tablename_error" class="validateErrorContainer"></div>
               </div>
           </fieldset>
          
          <fieldset title="3. Display Column">
              <legend>Select the major field to show</legend>      
              <div class="wizard_content">
                 <label>Display Column</label>
                 <select size="7" name="representative_field" id="addTable_representative_field" style="width:100%">
                   <option selected="true" value="any">any</option>
                 </select>
                 <div id="addTable_representative_field_error" class="validateErrorContainer"></div>
		      </div>
          </fieldset>

         <input type="hidden" id="parentId" name="parent_id" />
         <button id="dialog_finish" class="finish">Create</button>
</form>
