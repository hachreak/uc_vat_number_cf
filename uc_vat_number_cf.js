/*List of European countries (in order of the array)
	Allemagne
	Autriche
	Belgique
	Danemark
	Espagne
	Finlande
	France
	Grce
	Irlande
	Italie
	Luxembourg
	Pays-Bas
	Portugal
	Royaume-Uni
	Sude
	Chypre
	Estonie
	Hongrie
	Lettonie
	Lituanie
	Malte
	Pologne
	Rpublique tchque
	Slovaquie
	Slovnie*/

$(document).ready(
  function() {
    var european_countries = [276, 040, 056, 208, 724, 246, 250, 300, 372, 380, 442, 528, 620, 826, 752, 196, 233, 348, 428, 440, 470, 616, 203, 703, 705];
    var vat_label = $('#billing-pane tr:last td.field-label').html();
    $('#edit-panes-billing-billing-country').change(function () {
      var in_europe = false;
      for(var country_id in european_countries) {
        if(european_countries[country_id] == $('#edit-panes-billing-billing-vat-number').val()) {
          in_europe = true;
        }
      }
      if(in_europe == true) {
        $('#billing-pane tr:last td.field-label').html('<span class="form-required">*</span>' + vat_label);
       alert(vat_label);
        $('#billing-pane tr:last').fadeIn();
      } else {
        $('#billing-pane tr:last').fadeOut();
      }
    })
  }
);

/**
 * Behavior for the copy address checkbox.
 *
 * Copy the delivery information to the payment information on the checkout
 * screen if corresponding fields exist.
 */
function uc_cart_copy_address(checked, source, target) {
  if (!checked) {
    //$('#' + target + '-pane div.address-pane-table').slideDown();
    copy_box_checked = false;
    return false;
  }

  if (target == 'billing') {
    var x = 28;
  }
  else {
    var x = 26;
  }

  // Hide the target information fields.
  //$('#' + target + '-pane div.address-pane-table').slideUp();
  copy_box_checked = true;

  // Copy over the zone options manually.
  if ($('#edit-panes-' + target + '-' + target + '-zone').html() != $('#edit-panes-' + source + '-' + source + '-zone').html()) {
    $('#edit-panes-' + target + '-' + target + '-zone').empty().append($('#edit-panes-' + source + '-' + source + '-zone').children().clone());
    $('#edit-panes-' + target + '-' + target + '-zone').attr('disabled', $('#edit-panes-' + source + '-' + source + '-zone').attr('disabled'));
  }

  // Copy over the information and set it to update if delivery info changes.
  $('#' + source + '-pane input, select, textarea').each(
    function() {
      if (this.id.substring(0, x) == 'edit-panes-' + source + '-' + source) {
        $('#edit-panes-' + target + '-' + target + this.id.substring(x)).val($(this).val());
        if (target == 'billing') {
          $(this).change(function () { update_billing_field(this); });
        }
        else {
          $(this).change(function () { update_delivery_field(this); });
        }
      }
    }
  );

  return false;
}